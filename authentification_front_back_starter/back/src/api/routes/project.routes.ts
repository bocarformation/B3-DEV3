import { Router } from "express";
import { getProjectsByCursor, getProjectsPaginated, getPublicProjects, projectsList } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoleMiddleware } from "../middlewares/authorize-roles.middleware";
import { Role } from "../../domain/enums/role.enum";

const router = Router();

// Routes publiques (sans auth)
router.get("/public", getPublicProjects);
router.get("/paginated", getProjectsPaginated); // ?page=1&limit=10
router.get("/cursor", getProjectsByCursor); // ?lastDate=...&lastId=...&limit=10


// Route protégées
router.use(authMiddleware);
router.use(authorizeRoleMiddleware(Role.ADMIN))
router.get("/", projectsList);


export {router as projectRouter };
