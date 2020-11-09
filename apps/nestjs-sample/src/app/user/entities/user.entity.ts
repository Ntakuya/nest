import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from '../../todo/entities/todo.entity';

@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        name: 'user_name',
        nullable: false,
    })
    userName: string

    @Column({
        name: 'display_name',
        nullable: false
    })
    displayName: string

    @OneToMany(type => TodoEntity, todo => todo.user)
    todos: TodoEntity[]
}
