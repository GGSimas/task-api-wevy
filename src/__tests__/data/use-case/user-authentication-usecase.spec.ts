import { hash } from 'bcryptjs';
import { InMemoryCreateUserRepository } from 'data/repository/in-memory/create-user-repository';
import { UserAuthenticationUseCase } from 'data/use-case/user-authentication-usecase';
import { UserInvalidCredentialsError } from 'domain/errors/user-invalid-credential-error';
import { describe, it, expect } from 'vitest';

const makeSut = () => {
    const userRepository = new InMemoryCreateUserRepository();
    const userAuthenticationuseCase = new UserAuthenticationUseCase(userRepository);

    return {
        userRepository,
        userAuthenticationuseCase,
    }
}

describe('User Authentication Usecase', () => {
    it('should be able to make the authentication', async () => {
        const { userRepository, userAuthenticationuseCase } = makeSut();

        await userRepository.create({
            name: 'user test',
            email: 'email@email.com',
            password: await hash('123456', 6),
        });

        const { user } = await userAuthenticationuseCase.execute('email@email.com', '123456');

        expect(user.id).toEqual(expect.any(Number))
    });

    it('should not be able to authenticate with wrong password', async () => {
        const { userRepository, userAuthenticationuseCase } = makeSut();
        await userRepository.create({
            name: 'user test',
            email: 'email@email.com',
            password: '123456',
        })

        expect(() => userAuthenticationuseCase.execute('email@email.com', '654321')).rejects.toBeInstanceOf(UserInvalidCredentialsError)
    })
    it('should not be able to authenticate with wrong email', async () => {
        const { userRepository, userAuthenticationuseCase } = makeSut();
        await userRepository.create({
            name: 'user test',
            email: 'email@email.com',
            password: '123456',
        })

        expect(() => userAuthenticationuseCase.execute('email2@email.com', '123456')).rejects.toBeInstanceOf(UserInvalidCredentialsError)
    })
})