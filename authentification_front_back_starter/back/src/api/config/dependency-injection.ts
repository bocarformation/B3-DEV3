import { asClass, asValue, createContainer, InjectionMode } from "awilix";
import { getEnv } from "./get-env";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { IIDGenerator } from "../../shared/interfaces/id-generator.interface";
import { ITokenGenerator } from "../../shared/interfaces/token-generator.interface";
import { IAuthenticator } from "../../shared/interfaces/authenticator.interface";
import { IPasswordHasher } from "../../shared/interfaces/password-hasher.interface";
import { LoginUserUseCase } from "../../application/usecases/auth/login-user.usecase";
import { RegisterUserUseCase } from "../../application/usecases/auth/register-user.usecase";
import { MemoryUserRepository } from "../../infrastructure/repositories/memory-user-repository";
import { UUIDGenerator } from "../../shared/utils/uuid-generator";
import { JwtAuthenticator } from "../../shared/services/jwt-authenticator";
import { JwtTokenGenerator } from "../../shared/utils/jwt-token-generator";
import { BcryptPasswordHasher } from "../../shared/utils/bcrypt-password-hasher";
import { IAnalyticsRepository } from "../../domain/interfaces/analytics-repository.interface";
import { RecordAnalyticsCommand } from "../../application/commands/record-analytics.command";
import { GetAnalyticsQuery } from "../../application/queries/get-analytics.query";
import { MongoAnalyticsRepository } from "../../infrastructure/repositories/mongo-analytics-repository";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";
import { ProjectsQuery } from "../../application/queries/projects.query";

const jwtSecret = getEnv('JWT_SECRET');

export interface Dependencies {
    userRepository: IUserRepository;
    idGenerator: IIDGenerator;
    tokenGenerator: ITokenGenerator;
    authenticator: IAuthenticator;
    passwordHasher: IPasswordHasher;
    loginUserUseCase: LoginUserUseCase;
    registerUserUseCase: RegisterUserUseCase;
    analyticsRepository: IAnalyticsRepository;
    recordAnalyticsCommand: RecordAnalyticsCommand;
    getAnalyticsQuery: GetAnalyticsQuery;
    projectRepository: IProjectRepository;
    projectsQuery: ProjectsQuery;
    jwtSecret: string
}

const container = createContainer<Dependencies>({
    injectionMode: InjectionMode.CLASSIC
}); 

container.register({

    jwtSecret: asValue(jwtSecret),
    userRepository: asClass(MemoryUserRepository).singleton(),
    idGenerator: asClass(UUIDGenerator).singleton(),
    authenticator: asClass(JwtAuthenticator).singleton(),
    tokenGenerator: asClass(JwtTokenGenerator).singleton(),
    passwordHasher: asClass(BcryptPasswordHasher).singleton(),
    loginUserUseCase: asClass(LoginUserUseCase).singleton(),
    registerUserUseCase: asClass(RegisterUserUseCase).singleton(),
    analyticsRepository: asClass(MongoAnalyticsRepository).singleton(),
    recordAnalyticsCommand: asClass(RecordAnalyticsCommand).singleton(),
    getAnalyticsQuery: asClass(GetAnalyticsQuery).singleton(),
    projectsQuery: asClass(ProjectsQuery).singleton()


});




export default container;