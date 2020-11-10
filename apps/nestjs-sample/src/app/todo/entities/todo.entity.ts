import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProjectEntity } from '../../project/entities/project.entity';
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

    @OneToMany(() => ProjectEntity, project => project.todoes)
    project: ProjectEntity

    @ManyToOne(type => UserEntity, user => user.todoes)
    user: UserEntity

    @UpdateDateColumn({
        name: 'updated_at'
    })
    readonly updatedAt: Date

    @CreateDateColumn({
        name: 'created_at'
    })
    readonly createdAt: Date
}