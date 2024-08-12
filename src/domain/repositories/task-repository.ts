import { Task } from "@prisma/client";

export interface ICreateTaskRepository {
    getAll(userId: number): Promise<Task[]>
    findByTaskId(taskId:number): Promise<Task | null>
    create(description: string, userId: number): Promise<Task>;
    makeDone(id: number): Promise<Task | null>;
    delete(id: number): Promise<void>;
}