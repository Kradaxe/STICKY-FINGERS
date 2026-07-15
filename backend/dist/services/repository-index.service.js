import fs from "fs/promises";
import path from "path";
class RepositoryIndexService {
    ignoredDirectories = new Set([
        ".git",
        "node_modules",
        "dist",
        "build",
        ".next",
        "coverage",
        ".turbo",
    ]);
    maxFileSize = 50 * 1024; // 50 KB
    async build(repositoryPath) {
        const files = [];
        await this.walk(repositoryPath, repositoryPath, files);
        return { files };
    }
    async walk(root, current, files) {
        const entries = await fs.readdir(current, {
            withFileTypes: true,
        });
        for (const entry of entries) {
            const absolutePath = path.join(current, entry.name);
            const relativePath = path.relative(root, absolutePath);
            if (entry.isDirectory()) {
                if (this.ignoredDirectories.has(entry.name))
                    continue;
                await this.walk(root, absolutePath, files);
                continue;
            }
            const stat = await fs.stat(absolutePath);
            if (stat.size > this.maxFileSize)
                continue;
            try {
                const content = await fs.readFile(absolutePath, "utf8");
                files.push({
                    path: relativePath,
                    extension: path.extname(relativePath),
                    size: stat.size,
                    content,
                });
            }
            catch {
                // Skip binary or unreadable files
            }
        }
    }
}
export default new RepositoryIndexService();
//# sourceMappingURL=repository-index.service.js.map