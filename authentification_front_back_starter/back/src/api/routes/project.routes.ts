import { Router } from "express";
import { projectsList } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoleMiddleware } from "../middlewares/authorize-roles.middleware";
import { Role } from "../../domain/enums/role.enum";

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoleMiddleware(Role.ADMIN))
router.get("/", projectsList);

export {router as projectRouter };
