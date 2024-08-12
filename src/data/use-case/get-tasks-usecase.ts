import { ICreateTaskRepository } from "domain/repositories/task-repository";
import { GetTasksUseCaseReturn, IGetTaskUserCase } from "domain/use-cases/get-tasks-usecase";

export class GetTasksUseCase implements IGetTaskUserCase {
    constructor(private readonly taskRepository: ICreateTaskRepository) {}

    async execute(userId: number): Promise<GetTasksUseCaseReturn> {
        const tasks = await this.taskRepository.getAll(userId)

        return { tasks };
    }
    
}