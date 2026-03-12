import { NextFunction, Request, Response } from "express";
import container from "../config/dependency-injection";

export const projectsList = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

         const projects = [
            {
                id: "1",
                title: "Hackathon Santé 2025",
                description: "Un événement pour innover dans le domaine de la santé numérique.",
                skills: ["React", "Node.js", "MongoDB"],
            },
            {
                id: "2",
                title: "Salon de la photo immersive",
                description: "Projet artistique autour des technologies immersives et interactives.",
                skills: ["Three.js", "WebGL", "UX Design"],
            },
            {
                id: "3",
                title: "Plateforme de freelance éthique",
                description: "Réinventer le modèle de mise en relation pour les freelances tech.",
                skills: ["Next.js", "Prisma", "PostgreSQL"],
            },
        ];

        return res.jsonSuccess(projects)
    } catch (error) {
        next(error);
    }



};

export const getPublicProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {  
        const projects = await container.resolve("projectsQuery").execute();
        return res.jsonSuccess(projects,200)

    } catch (error) {
        next(error);
    }
}

// Pagination par offset(skip + limit)
export const getProjectsPaginated = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {  
       const page = parseInt(req.query.page as string) || 1; // ?page=1
       const limit = parseInt(req.query.limit as string) || 10; // &limit=10
       
       const result = await container.resolve("mongoProjectRepository").findPaginated(page, limit);

       return res.jsonSuccess({
            projects: result.projects,
            total: result.total,
            page,
            limit,
            totalPages: Math.ceil(result.total / limit)
    },200)

    } catch (error) {
        next(error);
    }
}

// Pagination par curseur (keyset)
export const getProjectsByCursor = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {  
        const lastDate = req.query.lastDate as string | undefined; 
        const lastId = req.query.lastId as string | undefined;
        const limit = parseInt(req.query.limit as string) || 10;

        const projects = await container.resolve("mongoProjectRepository").findByCursor(lastDate, lastId, limit);

        return res.jsonSuccess({
            projects, 
            nextCursor: projects.length > 0 ? {
                lastDate: projects[projects.length - 1].date,
                lastId: projects[projects.length - 1]._id
            } : null 
        },200)
       
    } catch (error) {
        next(error);
    }
}