import { NextFunction, Request, Response } from "express";
import { extractToken } from "../utils/extract-token";
import container from "../config/dependency-injection";
import { TokenPayload } from "../../application/security/token-payload";

declare module "express-serve-static-core" {
    interface Request {
        user?: TokenPayload;
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    // const authorization = req.headers.authorization;

    // if(!authorization) {
    //     return res.jsonError("Unauthorized", 403);
    // }

    const token = req.cookies?.accessToken;
    
    // const token = extractToken(authorization);

    if(!token){
        return res.jsonError("Unauthorized",403);
    }


    const user = await container.resolve("authenticator").authenticate(token);

    if(!user){
        return res.jsonError("Unauthorized",403)
    }

    // On ne renvoie pas (JAMAIS) le mot de passe
    req.user = {
        userId: user.props.id,
        email: user.props.email,
        role: user.props.role
    };
    next();
}