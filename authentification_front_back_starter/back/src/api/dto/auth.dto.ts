import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../domain/enums/role.enum";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string; 

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}