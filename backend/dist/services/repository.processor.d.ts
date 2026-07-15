import type { RepositorySnapshot } from "../types/file-tree.types.js";
declare class RepositoryProcessor {
    private readonly storagePath;
    constructor();
    /**
     * Public method that clones a repository and returns
     * the local filesystem path.
     */
    processRepository(repoUrl: string): Promise<RepositorySnapshot>;
    /**
     * Clone repository into storage/repositories
     */
    private cloneRepository;
    /**
     * Generates a unique folder name.
     */
    private generateRepositoryName;
    private buildRepositoryStructure;
    private scanDirectory;
}
declare const _default: RepositoryProcessor;
export default _default;
//# sourceMappingURL=repository.processor.d.ts.map