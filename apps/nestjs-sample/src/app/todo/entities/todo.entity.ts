import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from '../../user/entities/user.entity';

@Entity({
    name: 'todoes'
})
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column({
        nullable: false
    })
    title: string

    @Column({
        nullable: false
    })
    description: string

    @Column({
        nullable: false,
        default: false,
        name: 'is_complete'
    })
    isComplete: boolean

    @UpdateDateColumn({
        name: 'updated_at'
    })
    readonly updatedAt: Date

    @CreateDateColumn({
        name: 'created_at'
    })
    readonly createdAt: Date

    @ManyToOne(type => UserEntity, user => user.todos)
    user: UserEntity
}