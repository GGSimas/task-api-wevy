import { TaskRepository } from "data/repository/prisma/create-task-repository";
import { GetTasksUseCase } from "data/use-case/get-tasks-usecase";
import { IGetTasksController } from "domain/http/controllers/get-task";
import { Request, Response } from "express";

export class GetTasksController implements IGetTasksController {
    async handleGetTasks(request: Request, response: Response): Promise<void> {
        const { id } = request.user;

        const taskRepository = new TaskRepository();
        const taskUseCase = new GetTasksUseCase(taskRepository);

        const { tasks } = await taskUseCase.execute(id);

        response.status(200).send({ tasks });
    }
    
}