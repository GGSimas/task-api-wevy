import { User } from "@prisma/client";

export interface UserAuthenticationUseCaseReturn {
    user: User;
    token: string;
}

export interface IUserAuthenticationUseCase {
    execute(email: string, password: string): Promise<UserAuthenticationUseCaseReturn>;
}