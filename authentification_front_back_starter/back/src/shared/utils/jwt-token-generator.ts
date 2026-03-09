import jwt from "jsonwebtoken";
import { ITokenGenerator } from "../interfaces/token-generator.interface";

export class JwtTokenGenerator implements ITokenGenerator {
    constructor(private readonly jwtSecret: string) {}

    async generate(payload: any): Promise<string> {
        return jwt.sign(payload, this.jwtSecret)
    }
}