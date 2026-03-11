import type { Dependencies } from "../../store/dependencies";
import { createStore, type AppStore } from "../../store/store";
import { FetchMeApi } from "../auth/api/fetch-user.api";
import { LoginUserApi } from "../auth/api/login-user-api";
import { RegisterUserApi } from "../auth/api/register-user-api";
import { FetchProjectsApi } from "../projects/api/fetch-projects.api";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            registerGateway: new RegisterUserApi(),
            loginGateway: new LoginUserApi(),
            fetchProjects: new FetchProjectsApi(),
            fetchMe: new FetchMeApi()
        };
    }}

export const app = new App();

