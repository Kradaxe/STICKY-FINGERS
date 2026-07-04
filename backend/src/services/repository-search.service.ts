import type{ RepositoryIndex, IndexedFile } from "../types/repository-index.js";

class RepositorySearchService {
  public search(
    index: RepositoryIndex,
    query: string
  ): IndexedFile[] {
    const keyword = query.toLowerCase();

    return index.files.filter((file) => {
      return (
        file.path.toLowerCase().includes(keyword) ||
        file.content.toLowerCase().includes(keyword)
      );
    });
  }
}

export default new RepositorySearchService();