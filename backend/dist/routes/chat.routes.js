import { Router } from "express";
import { askRepository } from "../controllers/chat.controller.js";
const router = Router();
router.post("/chat", askRepository);
export default router;
//# sourceMappingURL=chat.routes.js.map