import { Router } from "express";
import { projectsList } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware)
router.get("/", projectsList);

export {router as projectRouter };
