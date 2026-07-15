export interface FileNode {
    name: string;
    path: string;
    type: "file" | "directory";
    extension?: string;
    size: number;
    children?: FileNode[];
}
export interface RepositoryStatistics {
    totalFiles: number;
    totalDirectories: number;
    totalSize: number;
    extensions: Record<string, number>;
}
export interface RepositoryStructure {
    tree: FileNode[];
    statistics: RepositoryStatistics;
}
export interface RepositorySnapshot {
    repositoryPath: string;
    structure: RepositoryStructure;
}
//# sourceMappingURL=file-tree.types.d.ts.map