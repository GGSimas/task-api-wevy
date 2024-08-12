import { Task } from '@prisma/client'

export interface CreateTasksUseCaseReturn {
    task: Task;
}

export interface ICreateTaskUseCase {
    execute(description: string, userId: number): Promise<CreateTasksUseCaseReturn>;
}