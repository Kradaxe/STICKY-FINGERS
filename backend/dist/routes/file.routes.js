import { Router } from "express";
import { getFileContent } from "../controllers/file.controller.js";
const router = Router();
router.get("/file", getFileContent);
export default router;
//# sourceMappingURL=file.routes.js.map