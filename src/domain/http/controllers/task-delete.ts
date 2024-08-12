import { Request, Response } from "express";

export interface ITasksDeleteController {
    handleDeleteTask(request: Request, response: Response): Promise<void>;
}