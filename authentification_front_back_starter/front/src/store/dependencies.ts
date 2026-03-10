import type { ILoginGateway } from "../features/auth/api/interfaces/login-user-gateway.interface";
import type { IRegisterGateway } from "../features/auth/api/interfaces/register-user-gateway.interface";
import type { FetchProjectsApi } from "../features/projects/api/fetch-projects.api";

export type Dependencies = {
    registerGateway: IRegisterGateway;
    loginGateway: ILoginGateway;
    fetchProjects: FetchProjectsApi
};