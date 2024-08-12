import { Prisma, User } from "@prisma/client";
import { ICreateUserRepository } from "domain/repositories/create-user-repository";
import { prisma } from "lib/prisma";

export class PrismaCreateUserRepository implements ICreateUserRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = prisma.user.create({ data });
        return user;
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        return user;
    }

}