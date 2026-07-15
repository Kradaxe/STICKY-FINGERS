// backend/src/services/github.service.ts
import axios from "axios";
class GithubService {
    api;
    constructor() {
        this.api = axios.create({
            baseURL: "https://api.github.com",
            headers: {
                Accept: "application/vnd.github+json",
                ...(process.env.GITHUB_TOKEN && {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                }),
            },
        });
    }
    /**
     * Validates whether a URL is a valid GitHub repository URL.
     */
    validateRepositoryUrl(url) {
        const regex = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/;
        return regex.test(url);
    }
    /**
     * Extracts owner and repository name from a GitHub URL.
     */
    extractRepositoryInfo(url) {
        if (!this.validateRepositoryUrl(url)) {
            throw new Error("Invalid GitHub repository URL.");
        }
        const regex = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/;
        const match = url.match(regex);
        if (!match) {
            throw new Error("Unable to parse repository URL.");
        }
        return {
            owner: match[1],
            repo: match[2],
        };
    }
    /**
     * Fetches repository metadata from GitHub.
     */
    async getRepository(repoUrl) {
        try {
            const { owner, repo } = this.extractRepositoryInfo(repoUrl);
            const { data } = await this.api.get(`/repos/${owner}/${repo}`);
            return this.mapRepository(data);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error("Repository not found.");
                }
                if (error.response?.status === 403) {
                    throw new Error("GitHub API rate limit exceeded.");
                }
            }
            throw error;
        }
    }
    /**
     * Converts GitHub's response into our internal Repository model.
     */
    mapRepository(githubRepo) {
        return {
            id: githubRepo.id,
            name: githubRepo.name,
            fullName: githubRepo.full_name,
            owner: githubRepo.owner.login,
            description: githubRepo.description,
            stars: githubRepo.stargazers_count,
            forks: githubRepo.forks_count,
            openIssues: githubRepo.open_issues_count,
            defaultBranch: githubRepo.default_branch,
            primaryLanguage: githubRepo.language,
            topics: githubRepo.topics,
            url: githubRepo.html_url,
        };
    }
}
export default new GithubService();
//# sourceMappingURL=github.service.js.map