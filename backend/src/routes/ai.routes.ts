import { Router } from "express";
import { explainFile } from "../controllers/ai.controller.js";

const router = Router();

router.post(
  "/explain-file",
  explainFile
);

export default router;