import { NextFunction, Request, Response } from "express";
import { RequestValidator } from "../utils/validate-request";
import { LoginUserDto, RegisterUserDto } from "../dto/auth.dto";
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

        const {errors, input} = await RequestValidator(LoginUserDto, req.body);

        if(errors){
            return res.jsonError(errors)
        }

        const result = await container.resolve("loginUserUseCase").execute({
            email: input.email,
            password: input.password
        })

        res.cookie("accessToken", result.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 3600 * 24 * 7 * 1000 // 1 semaine
        })

        return res.jsonSuccess({
            user: {
                userId: result.user.props.id,
                email: result.user.props.email,
                role: result.user.props.role
            }
        }, 200);
    } catch (error) {
        next(error);
    }
};


export const me = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        if(!req.user){
            return res.jsonError("Vous n'êtes pas connecté", 401);
        }

        const {userId, email, role} = req.user;

        return res.jsonSuccess({userId, email, role},200)
    } catch (error) {
        next(error)
    }
};