import { TaskRepository } from "data/repository/prisma/create-task-repository";
import { TaskDeleteUseCase } from "data/use-case/task-delete-usecase";
import { ITasksDeleteController } from "domain/http/controllers/task-delete";
import { Request, Response } from "express";
import { z } from "zod";

export class TaskDeleteController implements ITasksDeleteController {
    async handleDeleteTask(request: Request, response: Response): Promise<void> {
             const { taskId } = request.params;
       try {
        const taskRepository = new TaskRepository();
        const taskUseCase = new TaskDeleteUseCase(taskRepository);

        await taskUseCase.execute(Number(taskId));

        response.sendStatus(200);
       } catch(error) {
        response.status(400).send({ message: (error as Error).message });
       }
    }
    
}