export interface RepositoryAnalysis {
  frontend?: string;
  backend?: string;

  database: string[];

  languages: string[];

  packageManager?: string;

  styling: string[];

  testing: string[];

  deployment: string[];

  authentication: string[];

  tools: string[];
}