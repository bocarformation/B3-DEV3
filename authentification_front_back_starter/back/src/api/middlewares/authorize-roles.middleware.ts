import { NextFunction, Request, Response } from "express";
import { Role } from "../../domain/enums/role.enum";

export const authorizeRoleMiddleware = (...allowedRoles: Role[]) => 
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        if(!req.user){
            return res.jsonError("Unauthorized", 403)
        }

        const userRole = req.user.role; 

        if(!allowedRoles.includes(userRole)){
            return res.jsonError("Unauthorized", 403)
        }
        next();
    }

