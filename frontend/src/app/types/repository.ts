export interface Repository {
  id: number;
  name: string;
  fullName: string;
  owner: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  primaryLanguage: string | null;
  topics: string[];
  url: string; 
  path: string;
}

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

export interface RepositoryAnalysis {
  database: string[];
  languages: string[];
  styling: string[];
  testing: string[];
  deployment: string[];
  authentication: string[];
  tools: string[];
}

export interface RepositoryResponse {
  success: boolean;
  data: {
    repository: Repository;
    structure: RepositoryStructure;
    analysis: RepositoryAnalysis;
    summary: string;
  };
  index: {
    files: {
      path: string;
      extension: string;
      size: number;
      content: string;
    }[];
  }
}