import { Request, Response } from "express";

export interface IGetTasksController {
    handleGetTasks(request: Request, response: Response): Promise<void>;
}