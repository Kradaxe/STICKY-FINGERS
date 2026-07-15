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
}
export interface GitHubRepositoryResponse {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
    };
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    default_branch: string;
    language: string | null;
    topics: string[];
    html_url: string;
}
//# sourceMappingURL=repository.types.d.ts.map