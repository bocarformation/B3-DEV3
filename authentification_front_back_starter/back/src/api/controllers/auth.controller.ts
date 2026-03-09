import { NextFunction, Request, Response } from "express";
import { RequestValidator } from "../utils/validate-request";
import { RegisterUserDto } from "../dto/auth.dto";
import container from "../config/dependency-injection";


export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

        const {errors, input} = await RequestValidator(RegisterUserDto, req.body)
 

        if(errors) {
            return res.jsonError(errors);
        }

        const id = await container.resolve("registerUserUseCase").execute({
            email: input.email,
            password: input.password,
            firstname: input.firstname,
            lastname: input.lastname,
            role: input.role
        })

        return res.jsonSuccess({id}, 201)
    } catch (error) {
        if(error instanceof Error && error.message === "Email already exists"){
                return res.jsonError("Cet email est déjà utilisé", 409)
        }
        next(error)
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {

    } catch (error) {
    }
};