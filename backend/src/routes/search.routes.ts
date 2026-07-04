import { Router } from "express";
import { searchRepository } from "../controllers/search.controller.js";

const router = Router();

router.post("/search", searchRepository);

export default router;