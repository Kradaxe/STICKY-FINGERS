import fs from "fs/promises";
import path from "path";
import type{ RepositoryIndex, IndexedFile } from "../types/repository-index.js";

class RepositoryIndexService {
  private ignoredDirectories = new Set([
    ".git",
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
    ".turbo",
  ]);

  private maxFileSize = 50 * 1024; // 50 KB

  public async build(repositoryPath: string): Promise<RepositoryIndex> {
    const files: IndexedFile[] = [];

    await this.walk(repositoryPath, repositoryPath, files);

    return { files };
  }

  private async walk(
    root: string,
    current: string,
    files: IndexedFile[]
  ): Promise<void> {
    const entries = await fs.readdir(current, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name);
      const relativePath = path.relative(root, absolutePath);

      if (entry.isDirectory()) {
        if (this.ignoredDirectories.has(entry.name)) continue;

        await this.walk(root, absolutePath, files);
        continue;
      }

      const stat = await fs.stat(absolutePath);

      if (stat.size > this.maxFileSize) continue;

      try {
        const content = await fs.readFile(
          absolutePath,
          "utf8"
        );

        files.push({
          path: relativePath,
          extension: path.extname(relativePath),
          size: stat.size,
          content,
        });
      } catch {
        // Skip binary or unreadable files
      }
    }
  }
}

export default new RepositoryIndexService();