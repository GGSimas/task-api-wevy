import { PrismaCreateUserRepository } from "data/repository/prisma/create-user-repository";
import { UserAuthenticationUseCase } from "data/use-case/user-authentication-usecase";
import { IUserAuthenticationController } from "domain/http/controllers/auth-user";
import { Request, Response } from "express";
import { z } from "zod";

export class UserAuthenticationController implements IUserAuthenticationController {
    async handleAuthentication(request: Request, response: Response): Promise<any> {
        const authSchema = z.object({
            email: z.string().email(),
            password: z.string(),
        })

        const { email, password } = authSchema.parse(request.body);

        try {
            const userRepository = new PrismaCreateUserRepository();
            const userAuthentication = new UserAuthenticationUseCase(userRepository);

            const { user, token } = await userAuthentication.execute(email, password);

            response.status(200).send({ user, token })
        } catch (error) {
            response.status(401).send({ message: (error as Error).message})
        }
    }
    
}