import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodosService } from './todos.service';
import { TodoStatus } from './todo-status.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('todos')
@UseInterceptors(ClassSerializerInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Get('detail/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return await this.todosService.findById(id);
  }

  @Get('filter')
  async filterByStatus(@Query('status') status: TodoStatus): Promise<Todo[]> {
    return await this.todosService.filterByStatus(status);
  }

  @Get('search')
  async search(@Query('title') title: string): Promise<Todo[]> {
    return await this.todosService.search(title);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return await this.todosService.create(createTodoDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return await this.todosService.updateStatus(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.todosService.delete(id);
  }
}
