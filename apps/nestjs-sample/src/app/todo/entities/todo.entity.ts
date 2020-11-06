import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}