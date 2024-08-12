import { Task } from "@prisma/client";
import { TaskRepository } from "data/repository/prisma/create-task-repository";
import { CreateTaskUseCase } from "data/use-case/create-task-usecase";
import { ICreateTaskController } from "domain/http/controllers/create-task";
import { Request, Response } from "express";
import { z } from "zod";

export class CreateTaskController implements ICreateTaskController {
    async handleCreateTask(request: Request, response: Response): Promise<void> {
       const taskScheme = z.object({
        description: z.string(),
       });

       const { description } = taskScheme.parse(request.body);
       try {
        const taskRepository = new TaskRepository();
        const taskUseCase = new CreateTaskUseCase(taskRepository);

        const { task } = await taskUseCase.execute(description, request.user.id);

        response.status(200).send({ task });
       } catch(error) {
        response.status(400).send({ message: (error as Error).message });
       }
    }
    
}