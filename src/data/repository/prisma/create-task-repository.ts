import { Task } from "@prisma/client";
import { ICreateTaskRepository } from "domain/repositories/task-repository";
import { prisma } from "lib/prisma";

export class TaskRepository implements ICreateTaskRepository {
    async findByTaskId(taskId: number): Promise<Task|null> {
        const task = await prisma.task.findFirst({ where: { id: taskId }});
        
        if (!task) return null;
        
        return task;
    }
    async getAll(userId: number): Promise<Task[]> {
        const tasks = await prisma.task.findMany({ where: {
            userId,
        }});

        return tasks;
    }
    
    async create(description: string, userId: number): Promise<Task> {
       const task = await prisma.task.create({
            data: {
                description,
                userId
            }
       })

       return task;
    }

    async makeDone(id: number): Promise<Task | null> {
        const task = await prisma.task.update({
            where: { id },
            data: {
                done: true,
            }
        })

        return task
    }

    async delete(id: number): Promise<void> {
        await prisma.task.delete({ where: {id} });
    }
    
}