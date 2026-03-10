import { IUserRepository } from "../../../domain/interfaces/user-repository.interface";
import { IPasswordHasher } from "../../../shared/interfaces/password-hasher.interface";
import { ITokenGenerator } from "../../../shared/interfaces/token-generator.interface";
import { TokenPayload } from "../../security/token-payload";

interface LoginUserPayload {
    email: string, 
    password: string
}

export class LoginUserUseCase{
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenGenerator: ITokenGenerator 
    ){}


   async execute(payload: LoginUserPayload){
        const user = await this.userRepository.findByEmail(payload.email); 

        if(!user){
            throw new Error("Wrong credentials");
        }

        const isPasswordValid = await this.passwordHasher.compare(payload.password, user.props.password)

        if(!isPasswordValid){
            throw new Error("Wrong credentials");
        };

        const tokenPayload: TokenPayload = {
            userId: user.props.id,
            email: user.props.email,
            role: user.props.role
        };

        const token = await this.tokenGenerator.generate(tokenPayload);
        
        return {token, user};
    }
}
