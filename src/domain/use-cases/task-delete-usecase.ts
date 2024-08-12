export interface ITaskDeleteUseCase {
    execute(taskId: number): Promise<void>;
}