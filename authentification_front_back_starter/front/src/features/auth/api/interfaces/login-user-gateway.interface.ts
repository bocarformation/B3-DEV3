import * as AuthModel from "../../domain/model/auth-model";

export interface ILoginGateway {
    token(payload: AuthModel.LoginForm): Promise<{token: string}>;
}