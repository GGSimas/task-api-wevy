import { Request, Response } from "express";

export interface ITaskDoneController {
    handleTaskDone(request:Request, response: Response): Promise<void>;
}