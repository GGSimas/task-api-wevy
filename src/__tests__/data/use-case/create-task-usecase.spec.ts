import { InMemoryCreateTaskRepository } from 'data/repository/in-memory/create-task-repository';
import { CreateTaskUseCase } from 'data/use-case/create-task-usecase';
import { describe, it, expect } from 'vitest';

const makeSut = () => {
    const taskRepository = new InMemoryCreateTaskRepository();
    const taskUseCase = new CreateTaskUseCase(taskRepository);

    return  {
        taskRepository,
        taskUseCase,
    }
}

describe('create task use case', () => {
    it('should be able to create an task', async () => {
        const { taskUseCase } = makeSut();

        const {task} = await taskUseCase.execute('criando task test');

        expect(task.id).toEqual(expect.any(Number));
    })
})