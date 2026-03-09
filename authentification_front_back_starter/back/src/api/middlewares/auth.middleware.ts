import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/entities/user.entity";
import { extractToken } from "../utils/extract-token";
import container from "../config/dependency-injection";

declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authorization = req.headers.authorization;

    if(!authorization) {
        return res.jsonError("Unauthorized", 403);
    }

    const token = extractToken(authorization);

    if(!token){
        return res.jsonError("Unauthorized",403);
    }


    const user = await container.resolve("authenticator").authenticate(token);

    if(!user){
        return res.jsonError("Unauthorized",403)
    }

    req.user = user;
    next();
}