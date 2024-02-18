import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Task, TaskService } from './task.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  // criar endpoints para editar e deletar tarefas

  @Get('/')
  listTasks(): Task[] {
    return this.taskService.listTasks();
  }

  @Post('/')
  createTask(@Body() task: Task): Task {
    return this.taskService.createTask(task);
  }

  @Put('/')
  updateTask(@Body() task: Task): Task {
    return this.taskService.updateTask(task);
  }

  @Delete('/:id')
  deleteTask(@Param() { id }: { id: number }): void {
    if (!this.taskService.deleteTask(id)) {
      throw new HttpException('Task not found', 404);
    }
  }
}
