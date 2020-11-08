import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AuthEntity } from '../../auth/entities/auth.entity';
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

    @OneToOne<AuthEntity>(type => AuthEntity, auth => auth.user)
    auth: AuthEntity

    @OneToMany<TodoEntity>(type => TodoEntity, todo => todo.user)
    todoes: TodoEntity[]

    @CreateDateColumn({
        name: 'created_at'
    })
    readonly createdAt: Date

    @UpdateDateColumn({
        name: 'updated_at'
    })
    readonly updatedAt: Date
}
