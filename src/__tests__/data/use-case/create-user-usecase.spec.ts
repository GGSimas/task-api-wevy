import { compare } from 'bcryptjs';
import { InMemoryCreateUserRepository } from 'data/repository/in-memory/create-user-repository';
import { PrismaCreateUserRepository } from 'data/repository/prisma/create-user-repository';
import { CreateUserUseCase } from 'data/use-case/create-user-usecase';
import { UserAlreadyExistsError } from 'domain/errors/user-already-exists-error';
import { it, expect, describe } from 'vitest';

const makeSut = () => {
    const userRepository = new InMemoryCreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    return {
        createUserUseCase,
    }
}

describe('create user use case', () => {
    it('should be able to make registration', async () => {
        const { createUserUseCase } = makeSut();

        const { user } = await createUserUseCase.execute('user-test', 'test@email.com', '123456');

      
        expect(user.id).toEqual(expect.any(Number))
    });

    it('should hash user password on registration', async () => {
        const { createUserUseCase } = makeSut();

        const { user } = await createUserUseCase.execute('user-test', 'test@email.com', '123456');

        const isPasswordCorrectlyHashed = await compare('123456', user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    });

    it('should not be able to register with same email twice', async () => {
        const { createUserUseCase } = makeSut();
       
        await createUserUseCase.execute('user-test', 'test@email.com', '123456');
       

        expect(() =>  createUserUseCase.execute('user-test', 'test@email.com', '123456')).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})