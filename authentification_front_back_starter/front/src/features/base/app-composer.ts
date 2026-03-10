import type { Dependencies } from "../../store/dependencies";
import { createStore, type AppStore } from "../../store/store";
import { LoginUserApi } from "../auth/api/login-user-api";
import { RegisterUserApi } from "../auth/api/register-user-api";

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
        };
    }
}

export const app = new App();