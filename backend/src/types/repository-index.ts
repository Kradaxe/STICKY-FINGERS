export interface IndexedFile {
  path: string;
  extension: string;
  size: number;
  content: string;
}

export interface RepositoryIndex {
  files: IndexedFile[];
}