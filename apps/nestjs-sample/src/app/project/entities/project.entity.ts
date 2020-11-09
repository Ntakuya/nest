import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TodoEntity } from '../../todo/entities/todo.entity';
import { CreateProjectDto } from '../dto/create-project.dto';

@Entity({
    name: 'projects'
})
export class ProjectEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false
    })
    title: string

    @Column({
        nullable: false,
        default: ''
    })
    description: string

    @OneToMany(() => TodoEntity, todo => todo.project)
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
