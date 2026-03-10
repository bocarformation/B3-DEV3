import type { IRegisterGateway } from "./interfaces/register-user-gateway.interface";
import * as AuthModel from "../domain/model/auth-model";
import axios from "axios";

export class RegisterUserApi implements IRegisterGateway {
    async register(payload: AuthModel.RegisterForm): Promise<{userId: string}> {
        const response = await axios.post("http://localhost:8000/auth/register", payload);
        return response.data;
    }
}