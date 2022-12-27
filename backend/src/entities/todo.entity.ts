import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '../todos/todo-status.enum';
import { User } from './user.entity';

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

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column()
  userId: string;
}
