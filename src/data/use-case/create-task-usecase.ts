import { ICreateTaskRepository } from "domain/repositories/task-repository";
import { CreateTasksUseCaseReturn, ICreateTaskUseCase } from "domain/use-cases/create-tasks-usecase";

export class CreateTaskUseCase implements ICreateTaskUseCase {
    constructor(private readonly taskRepository: ICreateTaskRepository) {}
 
    async execute(description: string, userId: number): Promise<CreateTasksUseCaseReturn> {
        const task = await this.taskRepository.create(description, userId);

        return {
            task
        };
    }
}