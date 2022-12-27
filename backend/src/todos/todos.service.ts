import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './todo-status.enum';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from './todo.Repository';

@Injectable()
export class TodosService {
  constructor(private readonly todoRepository: TodoRepository) {}
  private todos: Todo[] = [];

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findById(id: string): Promise<Todo> {
    const found = await this.todoRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoRepository.createTodo(createTodoDto);
  }

  async updateStatus(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    todo.status = TodoStatus.IS_DONE;
    todo.updatedAt = new Date().toISOString();
    await this.todoRepository.save(todo);
    return todo;
  }

  async delete(id: string): Promise<void> {
    await this.todoRepository.delete({ id });
  }
}
