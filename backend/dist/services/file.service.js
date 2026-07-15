import fs from "fs/promises";
import path from "path";
class FileService {
    async getFileContent(repositoryPath, filePath) {
        const absoluteRepositoryPath = path.resolve(repositoryPath);
        const absoluteFilePath = path.resolve(repositoryPath, filePath);
        if (!absoluteFilePath.startsWith(absoluteRepositoryPath)) {
            throw new Error("Invalid file path.");
        }
        const content = await fs.readFile(absoluteFilePath, "utf-8");
        return {
            content,
            extension: path.extname(filePath).replace(".", "") ||
                "txt",
        };
    }
}
export default new FileService();
//# sourceMappingURL=file.service.js.map