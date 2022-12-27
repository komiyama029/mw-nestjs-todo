import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
