import { compare } from "bcryptjs";
import { UserInvalidCredentialsError } from "domain/errors/user-invalid-credential-error";
import { ICreateUserRepository } from "domain/repositories/create-user-repository";
import { IUserAuthenticationUseCase, UserAuthenticationUseCaseReturn } from "domain/use-cases/user-authentication-usecase";
import { GenereteJwt } from "lib/json-web-token";

export class UserAuthenticationUseCase implements IUserAuthenticationUseCase {
    constructor(private readonly userRepository: ICreateUserRepository) {}
   
   
    async execute(email: string, password: string): Promise<UserAuthenticationUseCaseReturn> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UserInvalidCredentialsError();
        }

        const doesPasswordsMatchs = await compare(password, user.password);

        if (!doesPasswordsMatchs) {
            throw new UserInvalidCredentialsError();
        }

        delete user.password;
        const genereteJwt = new GenereteJwt();

        const token = await genereteJwt.execute(user.id);
        return {
            user,
            token,
        }
    }
}