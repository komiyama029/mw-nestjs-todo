import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TodoRepository } from './todo.Repository';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
