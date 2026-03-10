import { User } from "../../../domain/entities/user.entity";
import { Role } from "../../../domain/enums/role.enum";
import { IUserRepository } from "../../../domain/interfaces/user-repository.interface";
import { IIDGenerator } from "../../../shared/interfaces/id-generator.interface";
import { IPasswordHasher } from "../../../shared/interfaces/password-hasher.interface";

interface RegisterUserPayload {
    email: string,
    password: string,
    firstname: string,
    lastname: string, 
    role: Role
}

export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly idGenerator: IIDGenerator, 
        private readonly passwordHasher: IPasswordHasher
    ){}

    async execute(payload: RegisterUserPayload){

        const existingUser = await this.userRepository.findByEmail(payload.email);

        if(existingUser){
            throw new Error("Email already exists");
        }

        const id = await this.idGenerator.generate();

        const hashedPassword = await this.passwordHasher.hash(payload.password);

        const user = new User({
            id,
            email: payload.email,
            password: hashedPassword,
            firstname: payload.firstname,
            lastname: payload.lastname,
            role: payload.role
        });

        user.validateOrThrow();

        await this.userRepository.save(user);
        console.log(user)
        return user;
    }

}