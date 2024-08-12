import { User } from "@prisma/client";

export interface CreateUserUseCaseReturn {
    user: User;
}
export interface ICreateUserUseCase {
    execute(name: string, email: string, password: string): Promise<CreateUserUseCaseReturn>;
}