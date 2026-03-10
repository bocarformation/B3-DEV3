import type { ILoginGateway } from "./interfaces/login-user-gateway.interface";
import * as AuthModel from "../domain/model/auth-model"
import axios from "axios";

export class LoginUserApi implements ILoginGateway {
    async token(payload: AuthModel.LoginForm): Promise<{token: string}> {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", payload);

            if(!response.data.success){
                throw new Error(response.data.error?.message || "Erreur inconnue");
            }

            return response.data.data
        } catch (error) {
          if(axios.isAxiosError(error) && error.response?.data?.error?.message){
            throw new Error(error.response.data.error.message)
          }  
          throw new Error("Une erreur inattendue est survenue");
        }
    }
}