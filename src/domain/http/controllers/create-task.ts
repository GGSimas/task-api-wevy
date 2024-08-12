import { Request, Response } from "express";

export interface ICreateTaskController {
    handleCreateTask(request: Request, response: Response): Promise<void>;
}