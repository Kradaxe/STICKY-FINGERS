import { Router } from "express";
import { generateDocumentation } from "../controllers/documentation.controller.js";

const router = Router();

router.post("/documentation", generateDocumentation);

export default router;