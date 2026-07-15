import repositoryCacheService from "../services/repository-cache.service.js";
import documentationService from "../services/documentation.service.js";
export const generateDocumentation = async (req, res) => {
    try {
        const { repoUrl } = req.body;
        console.log("Documentation request repoUrl:", repoUrl);
        const cached = repositoryCacheService.get(repoUrl);
        console.log("Cache hit:", !!cached);
        if (!cached) {
            res.status(400).json({
                success: false,
                message: "Analyze repository first.",
            });
            return;
        }
        const docs = await documentationService.generate(cached.index);
        res.json({
            success: true,
            data: docs,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unknown error",
        });
    }
};
//# sourceMappingURL=documentation.controller.js.map