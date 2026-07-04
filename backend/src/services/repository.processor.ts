import { simpleGit } from "simple-git";
import path from "path";
import fs from "fs/promises";

import type {
  RepositoryStructure,
  RepositoryStatistics,
  FileNode,
  RepositorySnapshot,
} from "../types/file-tree.types.js";

import {
  IGNORED_DIRECTORIES,
  IGNORED_FILES,
} from "../utils/file.utils.js";

class RepositoryProcessor {
  private readonly storagePath: string;

  constructor() {
    this.storagePath = path.join(process.cwd(), "storage", "repositories");
    console.log("Storage Path:", this.storagePath);
  }

  /**
   * Public method that clones a repository and returns
   * the local filesystem path.
   */
    public async processRepository(
      repoUrl: string
    ): Promise<RepositorySnapshot> {
      const repositoryPath = await this.cloneRepository(repoUrl);

      const structure =
        await this.buildRepositoryStructure(repositoryPath);

      return {
        repositoryPath,
        structure
      };
    }

  /**
   * Clone repository into storage/repositories
   */
  private async cloneRepository(repoUrl: string): Promise<string> {
    await fs.mkdir(this.storagePath, {
      recursive: true,
    });

    const repositoryName = this.generateRepositoryName(repoUrl);

    const clonePath = path.join(
      this.storagePath,
      repositoryName
    );

    const git = simpleGit();
    console.log("Starting clone...");
    await git.clone(repoUrl, clonePath, [
      "--depth",
      "1",
      "--filter=blob:none",
    ]);
    console.log("Clone completed!");

    return clonePath;
  }

  /**
   * Generates a unique folder name.
   */
  private generateRepositoryName(repoUrl: string): string {
    const repository = repoUrl
      .split("/")
      .slice(-2)
      .join("-")
      .replace(".git", "");

    return `${repository}-${Date.now()}`;
  }

  private async buildRepositoryStructure(
    repositoryPath: string
  ): Promise<RepositoryStructure> {
    const statistics: RepositoryStatistics = {
      totalFiles: 0,
      totalDirectories: 0,
        totalSize: 0,
        extensions: {},
      };
  
      const tree = await this.scanDirectory(
        repositoryPath,
        repositoryPath,
      statistics
        );
    
        return {
          tree,
          statistics,
        };
    }

    private async scanDirectory(
      currentPath: string,
      rootPath: string,
      statistics: RepositoryStatistics
    ): Promise<FileNode[]> {
      const entries = await fs.readdir(currentPath, {
        withFileTypes: true,
      });

      const nodes: FileNode[] = [];

      for (const entry of entries) {
        if (
          IGNORED_DIRECTORIES.includes(entry.name) ||
          IGNORED_FILES.includes(entry.name)
        ) {
          continue;
        }

        const fullPath = path.join(currentPath, entry.name);

        const relativePath = path.relative(rootPath, fullPath);

        const stat = await fs.stat(fullPath);

        if (entry.isDirectory()) {
          statistics.totalDirectories++;

          nodes.push({
            name: entry.name,
            path: relativePath,
            type: "directory",
            size: stat.size,
            children: await this.scanDirectory(
              fullPath,
              rootPath,
              statistics
            ),
          });

          continue;
        }

        statistics.totalFiles++;
        statistics.totalSize += stat.size;

        const extension =
          path.extname(entry.name).replace(".", "") || "unknown";

        statistics.extensions[extension] =
          (statistics.extensions[extension] || 0) + 1;

        nodes.push({
          name: entry.name,
          path: relativePath,
          type: "file",
          extension,
          size: stat.size,
        });
      }

      return nodes.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }

        return a.type === "directory" ? -1 : 1;
      });
    }


}

export default new RepositoryProcessor();