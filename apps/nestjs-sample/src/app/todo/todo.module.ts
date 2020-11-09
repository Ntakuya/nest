import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoEntity } from './entities/todo.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity])
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
