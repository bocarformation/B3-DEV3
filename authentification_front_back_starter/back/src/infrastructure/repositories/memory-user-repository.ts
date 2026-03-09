import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";

export class MemoryUserRepository implements IUserRepository {
    private users: User[];

    constructor(){
        this.users = [];
    }

     async save(user: User){
            this.users.push(user);
            return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(u => u.props.email === email) ?? null;
    }
}