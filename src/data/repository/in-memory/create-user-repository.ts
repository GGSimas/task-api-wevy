import { Prisma, User } from "@prisma/client";
import { ICreateUserRepository } from "domain/repositories/create-user-repository";

export class InMemoryCreateUserRepository implements ICreateUserRepository {
    public users: User[] = [];
   
    async create(data: Prisma.UserCreateInput): Promise<User> {
       const user: User = {
            id: 1,
            email: data.email,
            name: data.name,
            password: data.password,
       }

       this.users.push(user);

       return user;
    }

    async findByEmail(email: string): Promise<User | null> {
       const findUser = this.users.find(user => user.email === email);

       if (findUser) return findUser;

       return null;
    }    
}