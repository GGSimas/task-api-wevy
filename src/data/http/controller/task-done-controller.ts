import { TaskRepository } from "data/repository/prisma/create-task-repository";
import { TaskDoneUseCase } from "data/use-case/task-done-usecase";
import { ITaskDoneController } from "domain/http/controllers/task-done";
import { Request, Response } from "express";
import { z } from "zod";

export class TaskDoneController implements ITaskDoneController {
    async handleTaskDone(request: Request, response: Response): Promise<void> {
       const taskScheme = z.object({
        taskId: z.number(),
       });

       const { taskId } = taskScheme.parse(request.body);
       try {
        const taskRepository = new TaskRepository();
        const taskUseCase = new TaskDoneUseCase(taskRepository);

        await taskUseCase.execute(taskId);

        response.status(200).send();
       } catch(error) {
        response.status(400).send({ message: (error as Error).message });
       }
    }
    
}