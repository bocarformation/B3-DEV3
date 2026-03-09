import { createContainer, InjectionMode } from "awilix";
import { getEnv } from "./get-env";

const jwtSecret = getEnv('JWT_SECRET');

export interface Dependencies {
}

const container = createContainer<Dependencies>({
    injectionMode: InjectionMode.CLASSIC
}); 

container.register({
});


export default container;