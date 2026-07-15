import type { RepositoryIndex } from "../types/repository-index.js";
declare class RepositoryIndexService {
    private ignoredDirectories;
    private maxFileSize;
    build(repositoryPath: string): Promise<RepositoryIndex>;
    private walk;
}
declare const _default: RepositoryIndexService;
export default _default;
//# sourceMappingURL=repository-index.service.d.ts.map