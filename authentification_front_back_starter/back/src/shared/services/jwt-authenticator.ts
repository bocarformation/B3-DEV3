import jwt from "jsonwebtoken";
import { IAuthenticator } from "../interfaces/authenticator.interface";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { TokenPayload } from "../../application/security/token-payload";

export class JwtAuthenticator implements IAuthenticator {

    constructor(
        private readonly jwtSecret: string,
        private readonly userRepository: IUserRepository
    ){}

    async authenticate(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;

            const user = await this.userRepository.findByEmail(decoded.email);

            if(!user){
                throw new Error("User not found");
            }

            return user;
        } catch (err) {
            if(err.message === "User not found"){
                throw err
            }

                if(err instanceof jwt.JsonWebTokenError){
                    throw new Error("Invalid token")
                }

                if(err instanceof jwt.TokenExpiredError){
                    throw new Error("Token expired")
            }

            throw new Error("Oops, something went wrong");
        }
    }

}