import { ICreateTaskRepository } from "domain/repositories/task-repository";
import { ITaskDeleteUseCase } from "domain/use-cases/task-delete-usecase";

export class TaskDeleteUseCase implements ITaskDeleteUseCase {
    constructor(private readonly taskRepository: ICreateTaskRepository) {}
    
    async execute(taskId: number): Promise<void> {
        const task = this.taskRepository.delete(taskId);        
    }
    
}