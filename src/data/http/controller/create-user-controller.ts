import { Request, Response } from 'express'
import { ICreateUserController } from 'domain/http/controllers/create-user';
import { z } from 'zod';
import { PrismaCreateUserRepository } from 'data/repository/prisma/create-user-repository';
import { CreateUserUseCase } from 'data/use-case/create-user-usecase';

export class CreateUserController implements ICreateUserController {
    async handleCreateUser(request: Request, response: Response): Promise<void> {
        const requestScheme = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { name, email, password } = requestScheme.parse(request.body);

        try {
            const userRepository = new PrismaCreateUserRepository();
            const createUseUseCase = new CreateUserUseCase(userRepository);

            await createUseUseCase.execute(name, email, password);
            response.status(201).send();
        } catch (error) {
            response.status(409).send({message: (error as Error).message});
        }
    }    
}