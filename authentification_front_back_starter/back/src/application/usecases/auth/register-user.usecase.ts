interface RegisterUserPayload {
    email: string,
    password: string,
    firstname: string,
    lastname: string, 
    role: Role
}

export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly idGenerator: IIDGenerator, 
        private readonly passwordHasher: IpasswordHasher
    ){}

    async execute(payload: RegisterUserPayload){

        const existingUser = await this.userRepository.findByEmail(payload.email);

        if(existingUser){
            throw new Error("Email already exists");
        }

        const id = await this.idGenerator.generate();

        const hashedPassword = await this.passwordHasher.hash(payload.password);

        const user = new User({
            id,
            email: payload.email,
            password: hashedPassword,
            firstname: payload.firstname,
            lastname: payload.lastname,
            role: payload.role
        });

        user.validateOrThrow();

        await this.userRepository.save(user);
        return user;
    }

}