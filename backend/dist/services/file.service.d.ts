declare class FileService {
    getFileContent(repositoryPath: string, filePath: string): Promise<{
        content: string;
        extension: string;
    }>;
}
declare const _default: FileService;
export default _default;
//# sourceMappingURL=file.service.d.ts.map