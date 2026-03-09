import { NextFunction, Request, Response } from "express";

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