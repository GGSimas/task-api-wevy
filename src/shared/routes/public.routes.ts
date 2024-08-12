import { CreateUserController } from 'data/http/controller/create-user-controller';
import { UserAuthenticationController } from 'data/http/controller/user-authentication-controller';
import express from 'express';

export const publicRouter = express.Router();

const createUserController = new CreateUserController();
const userAuthenticationController = new UserAuthenticationController();

publicRouter.post('/', createUserController.handleCreateUser);

publicRouter.post('/session', userAuthenticationController.handleAuthentication);