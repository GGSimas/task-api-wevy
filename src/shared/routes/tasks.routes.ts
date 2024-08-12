import express from 'express';
import { ensureAuthentication } from 'shared/middleware/ensure-authenticated';
import { CreateTaskController } from 'data/http/controller/create-task-controller';
import { GetTasksController } from 'data/http/controller/get-tasks-controller';
import { TaskDoneController } from 'data/http/controller/task-done-controller';
import { TaskDeleteController } from 'data/http/controller/task-delete-controller';

const taskRoutes = express.Router();
const createTaskController = new CreateTaskController();
const getTasksController = new GetTasksController();
const taskDoneController = new TaskDoneController();
const taskDeleteController = new TaskDeleteController();


taskRoutes.post('/', ensureAuthentication, createTaskController.handleCreateTask);
taskRoutes.get('/', ensureAuthentication, getTasksController.handleGetTasks);
taskRoutes.patch('/', ensureAuthentication, taskDoneController.handleTaskDone);
taskRoutes.delete('/:taskId', ensureAuthentication, taskDeleteController.handleDeleteTask);

export { taskRoutes }