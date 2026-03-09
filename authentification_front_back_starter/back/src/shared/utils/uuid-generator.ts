import { v4 } from "uuid";
import { IIDGenerator } from "../interfaces/id-generator.interface";

export class UUIDGenerator implements IIDGenerator{
    async generate(): Promise<string> {
        return v4();
    }
}