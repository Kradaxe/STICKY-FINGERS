import type { RepositoryAnalysis } from "../types/analysis.types.js";
declare class TechnologyAnalyzer {
    analyze(repositoryPath: string): Promise<RepositoryAnalysis>;
    private readPackageJsons;
    private analyzeDependencies;
    private findPackageJsonFiles;
}
declare const _default: TechnologyAnalyzer;
export default _default;
//# sourceMappingURL=technology-analyzer.service.d.ts.map