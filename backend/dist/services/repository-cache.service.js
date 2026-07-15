class RepositoryCacheService {
    cache = new Map();
    set(repoUrl, repositoryPath, index) {
        this.cache.set(repoUrl, {
            path: repositoryPath,
            index,
            createdAt: Date.now(),
        });
    }
    get(repoUrl) {
        return this.cache.get(repoUrl);
    }
    has(repoUrl) {
        return this.cache.has(repoUrl);
    }
    clear() {
        this.cache.clear();
    }
}
export default new RepositoryCacheService();
//# sourceMappingURL=repository-cache.service.js.map