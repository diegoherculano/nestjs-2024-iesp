import { Injectable } from '@nestjs/common';

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
    throw new Error('Method not implemented.');
  }
  updateTask(task: Task): Task {
    throw new Error('Method not implemented.');
  }
  deleteTask(task: Task): Task {
    throw new Error('Method not implemented.');
  }

  listTasks(): Task[] {
    return this.tasks;
  }
}
