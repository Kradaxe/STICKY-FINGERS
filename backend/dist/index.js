import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import repositoryRoutes from "./routes/repository.routes.js";
import fileRoutes from "./routes/file.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import searchRoutes from "./routes/search.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import documentationRoutes from "./routes/documentation.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/repositories", repositoryRoutes);
app.use("/api/repositories", fileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", searchRoutes);
app.use("/api", chatRoutes);
app.use("/api", documentationRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "CodeForge API Running",
    });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map