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
  deleteTask(task: Task): Task;
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
  // TODO Implement deleteTask
  deleteTask(task: Task): Task {
    throw new Error('Method not implemented.');
  }

  listTasks(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    return this.tasks.find((item) => item.id === id);
  }
}
