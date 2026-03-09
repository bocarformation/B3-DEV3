import { NextFunction, Request, Response } from "express";

export const projectsList = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

    } catch (error) {
        next(error);
    }
};