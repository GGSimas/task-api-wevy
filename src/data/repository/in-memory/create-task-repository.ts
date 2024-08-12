import { Task } from "@prisma/client";
import { ICreateTaskRepository } from "domain/repositories/create-task-repository";

export class InMemoryCreateTaskRepository implements ICreateTaskRepository {
    public tasks: Task[] = []
    
    async create(description: string, userId: number): Promise<Task> {
        const task: Task = {
            id: 1,
            description,
            done: false,
            userId,
        }
        this.tasks.push(task);

        return task;
    }
    async makeDone(id: number): Promise<Task | null> {
       const findTask = this.tasks.find(task => task.id === id);

       if (!findTask) {
        return null;
       }

       findTask.done = true;

       return findTask;
    }
    async delete(id: number): Promise<void> {
        const tasks = this.tasks.filter(task => task.id !== id);
    }
    
}