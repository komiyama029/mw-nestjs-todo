import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '../todos/todo-status.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  status: TodoStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
