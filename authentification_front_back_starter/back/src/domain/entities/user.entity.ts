import { Role } from "../enums/role.enum";

export interface UserProps {
    id: string, 
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: Role
}

export class User {
    constructor(
        public props: UserProps
    ){}

    validateOrThrow(){
        if(!this.props.email){
            throw new Error("Email is required");
        }

        if(!this.props.password){
            throw new Error("Password is required");
        }

        if(!this.props.firstname){
            throw new Error("Firstname is required");
        }

        if(!this.props.lastname){
            throw new Error("Lastname is required");
        }
    }
}