import express from 'express';
import { publicRouter } from './public.routes';
import { taskRoutes } from './tasks.routes';


const router = express.Router();

router.use('/user', publicRouter);
router.use('/task', taskRoutes);


export { router };
