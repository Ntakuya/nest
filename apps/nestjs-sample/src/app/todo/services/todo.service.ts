import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>
    ) { }
}
