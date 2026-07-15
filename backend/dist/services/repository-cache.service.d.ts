import type { RepositoryIndex } from "../types/repository-index.js";
interface CachedRepository {
    path: string;
    index: RepositoryIndex;
    createdAt: number;
}
declare class RepositoryCacheService {
    private cache;
    set(repoUrl: string, repositoryPath: string, index: RepositoryIndex): void;
    get(repoUrl: string): CachedRepository | undefined;
    has(repoUrl: string): boolean;
    clear(): void;
}
declare const _default: RepositoryCacheService;
export default _default;
//# sourceMappingURL=repository-cache.service.d.ts.map