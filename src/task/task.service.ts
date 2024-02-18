import { HttpException, Injectable } from '@nestjs/common';

export type Task = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

interface ITaskService {
  listTasks(): Task[];
  createTask(task: Task): Task;
  updateTask(task: Task): Task;
  deleteTask(id: number): boolean;
}

@Injectable()
export class TaskService implements ITaskService {
  tasks: Task[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.tasks.push({
        id: i,
        title: `Task ${i}`,
        description: `Description ${i}`,
        done: false,
      });
    }
  }

  createTask(task: Task): Task {
    this.tasks.push({
      id: new Date().getTime(),
      ...task,
    });
    return task;
  }

  updateTask(task: Task): Task {
    const localTask = this.findOne(task.id);
    if (!localTask) {
      throw new HttpException('Task not found', 404);
    }

    localTask.title = task.title;
    localTask.description = task.description;
    localTask.done = task.done;
    return localTask;
  }

  deleteTask(id: number): boolean {
    const findIndex = this.tasks.findIndex((item) => item.id == id);

    if (findIndex === -1) return false;

    this.tasks.splice(findIndex, 1);

    return true;
  }

  listTasks(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    return this.tasks.find((item) => item.id === id);
  }
}
