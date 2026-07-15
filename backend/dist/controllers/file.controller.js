import fileService from "../services/file.service.js";
export const getFileContent = async (req, res) => {
    try {
        const repositoryPath = req.query.repositoryPath;
        const filePath = req.query.filePath;
        if (!repositoryPath || !filePath) {
            res.status(400).json({
                success: false,
                message: "Missing parameters.",
            });
            return;
        }
        const file = await fileService.getFileContent(repositoryPath, filePath);
        res.json({
            success: true,
            data: file,
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
//# sourceMappingURL=file.controller.js.map