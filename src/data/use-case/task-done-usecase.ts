import { ICreateTaskRepository } from "domain/repositories/task-repository";
import { ITaskDoneUseCase } from "domain/use-cases/task-done-usecase";

export class TaskDoneUseCase implements ITaskDoneUseCase {
    constructor(private readonly taskRepository: ICreateTaskRepository) {}
    
    async execute(taskId: number): Promise<void> {
        const task = this.taskRepository.makeDone(taskId);        
    }
    
}