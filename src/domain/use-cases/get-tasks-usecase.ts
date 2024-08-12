import { Task } from "@prisma/client";

export interface GetTasksUseCaseReturn {
    tasks: Task[]
}

export interface IGetTaskUserCase {
    execute(userId: number): Promise<GetTasksUseCaseReturn>;
}