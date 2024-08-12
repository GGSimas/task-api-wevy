import { Request, Response } from "express";

export interface IUserAuthenticationController {
    handleAuthentication(request: Request, response: Response): Promise<any>;
}