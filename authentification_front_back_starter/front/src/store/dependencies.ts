import type { IRegisterGateway } from "../features/auth/api/interfaces/register-user-gateway.interface";

export type Dependencies = {
    registerGateway: IRegisterGateway;
};