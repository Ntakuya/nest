import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from '../../todo/entities/todo.entity';

@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(type => TodoEntity, todo => todo.user)
    todos: TodoEntity[]
}
