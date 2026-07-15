import { simpleGit } from "simple-git";
import path from "path";
import fs from "fs/promises";
import { IGNORED_DIRECTORIES, IGNORED_FILES, } from "../utils/file.utils.js";
class RepositoryProcessor {
    storagePath;
    constructor() {
        this.storagePath = path.join(process.cwd(), "storage", "repositories");
        console.log("Storage Path:", this.storagePath);
    }
    /**
     * Public method that clones a repository and returns
     * the local filesystem path.
     */
    async processRepository(repoUrl) {
        console.time("clone");
        const repositoryPath = await this.cloneRepository(repoUrl);
        console.timeEnd("clone");
        console.time("structure");
        const structure = await this.buildRepositoryStructure(repositoryPath);
        console.timeEnd("structure");
        return {
            repositoryPath,
            structure
        };
    }
    /**
     * Clone repository into storage/repositories
     */
    async cloneRepository(repoUrl) {
        await fs.mkdir(this.storagePath, {
            recursive: true,
        });
        const repositoryName = this.generateRepositoryName(repoUrl);
        const clonePath = path.join(this.storagePath, repositoryName);
        try {
            await fs.access(clonePath);
            console.log("Repository already exists.");
            return clonePath;
        }
        catch {
            console.log("Cloning repository...");
            const git = simpleGit();
            await git.clone(repoUrl, clonePath, [
                "--depth",
                "1",
            ]);
            console.log("Clone completed!");
        }
        console.log("Clone completed!");
        return clonePath;
    }
    /**
     * Generates a unique folder name.
     */
    generateRepositoryName(repoUrl) {
        return repoUrl
            .split("/")
            .slice(-2)
            .join("-")
            .replace(".git", "");
    }
    async buildRepositoryStructure(repositoryPath) {
        const statistics = {
            totalFiles: 0,
            totalDirectories: 0,
            totalSize: 0,
            extensions: {},
        };
        const tree = await this.scanDirectory(repositoryPath, repositoryPath, statistics);
        return {
            tree,
            statistics,
        };
    }
    async scanDirectory(currentPath, rootPath, statistics) {
        const entries = await fs.readdir(currentPath, {
            withFileTypes: true,
        });
        const nodes = [];
        for (const entry of entries) {
            if (IGNORED_DIRECTORIES.includes(entry.name) ||
                IGNORED_FILES.includes(entry.name)) {
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
                    children: await this.scanDirectory(fullPath, rootPath, statistics),
                });
                continue;
            }
            statistics.totalFiles++;
            statistics.totalSize += stat.size;
            const extension = path.extname(entry.name).replace(".", "") || "unknown";
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
//# sourceMappingURL=repository.processor.js.map