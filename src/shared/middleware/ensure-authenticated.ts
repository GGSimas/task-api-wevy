import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { UnauthorizedError } from "domain/errors/unauthorized-error";
import { secret } from 'config/jwt';
import { AppError } from "domain/errors/app-error";

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError();
    }

    const [_, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(token, secret);

        request.user = {
            id: Number(userId)
        }

        return next();
    } catch {
        throw new AppError();
    }
}