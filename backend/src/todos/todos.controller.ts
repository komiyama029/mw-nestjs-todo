import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return await this.todosService.findById(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return await this.todosService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.todosService.delete(id);
  }
}
