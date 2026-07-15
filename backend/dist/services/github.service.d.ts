import type { Repository } from "../types/repository.types.js";
declare class GithubService {
    private readonly api;
    constructor();
    /**
     * Validates whether a URL is a valid GitHub repository URL.
     */
    validateRepositoryUrl(url: string): boolean;
    /**
     * Extracts owner and repository name from a GitHub URL.
     */
    extractRepositoryInfo(url: string): {
        owner: string;
        repo: string;
    };
    /**
     * Fetches repository metadata from GitHub.
     */
    getRepository(repoUrl: string): Promise<Repository>;
    /**
     * Converts GitHub's response into our internal Repository model.
     */
    private mapRepository;
}
declare const _default: GithubService;
export default _default;
//# sourceMappingURL=github.service.d.ts.map