import { Request, Response } from "express";

export interface ICreateUserController {
    handleCreateUser(request: Request, response: Response): Promise<void>;
}