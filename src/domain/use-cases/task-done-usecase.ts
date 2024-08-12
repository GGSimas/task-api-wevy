export interface ITaskDoneUseCase {
    execute(taskId: number): Promise<void>;
}