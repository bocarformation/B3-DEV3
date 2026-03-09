import bcrypt from "bcrypt";
import { IPasswordHasher } from "../interfaces/password-hasher.interface";

export class BcryptPasswordHasher implements IPasswordHasher{

    async hash(password: string){
        return await bcrypt.hash(password,10)
    }

    async compare(password: string, hashedPassword: string){
        return await bcrypt.compare(password, hashedPassword);
    }
}