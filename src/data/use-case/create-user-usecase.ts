import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "domain/errors/user-already-exists-error";
import { ICreateUserRepository } from "domain/repositories/create-user-repository";
import { CreateUserUseCaseReturn, ICreateUserUseCase } from "domain/use-cases/create-user-usecase";

export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(private readonly userRepository: ICreateUserRepository) {}
    async execute(name: string, email: string, password: string): Promise<CreateUserUseCaseReturn> {

        const userFindByEmail = await this.userRepository.findByEmail(email);

        if (userFindByEmail) {
           throw new UserAlreadyExistsError();
        }

        const password_hash = await hash(password, 6);

        const user = await this.userRepository.create({
            name,
            email,
            password: password_hash,
        })

        return {
            user,
        }
    }
    
}