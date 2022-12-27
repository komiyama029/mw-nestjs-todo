import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './todo-status.enum';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from './todo.Repository';
import { Like } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(private readonly todoRepository: TodoRepository) {}
  private todos: Todo[] = [];

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Todo> {
    const found = await this.todoRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async filterByStatus(status: TodoStatus): Promise<Todo[]> {
    return await this.todoRepository.find({
      status,
    });
  }

  async search(title: string): Promise<Todo[]> {
    const found = await this.todoRepository.find({
      title: Like(`%${title}%`),
    });
    return found;
  }

  async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return await this.todoRepository.createTodo(createTodoDto, user);
  }

  async updateStatus(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (todo.status === 'IS_DONE') {
      todo.status = TodoStatus.NOT_YET;
    } else {
      todo.status = TodoStatus.IS_DONE;
    }
    todo.updatedAt = new Date().toISOString();
    await this.todoRepository.save(todo);
    return todo;
  }

  async delete(id: string): Promise<void> {
    await this.todoRepository.delete({ id });
  }
}
