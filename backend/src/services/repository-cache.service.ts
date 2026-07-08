import type{ RepositoryIndex } from "../types/repository-index.js";

interface CachedRepository {
  path: string;
  index: RepositoryIndex;
  createdAt: number;
}

class RepositoryCacheService {
  private cache = new Map<string, CachedRepository>();

  public set(
    repoUrl: string,
    repositoryPath: string,
    index: RepositoryIndex
  ) {
    this.cache.set(repoUrl, {
      path: repositoryPath,
      index,
      createdAt: Date.now(),
    });
  }

  public get(repoUrl: string) {
    return this.cache.get(repoUrl);
  }

  public has(repoUrl: string) {
    return this.cache.has(repoUrl);
  }

  public clear() {
    this.cache.clear();
  }
}

export default new RepositoryCacheService();