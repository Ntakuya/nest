import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserStatus } from '../models/user-status';

@Entity({
    name: 'authes'
})
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @Column({
        name: 'signup_token'
    })
    signupToken: string

    @Column({
        nullable: false,
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.pending
    })
    status: UserStatus

    @CreateDateColumn({
        name: 'created_at'
    })
    readonly createdAt: Date

    @UpdateDateColumn({
        name: 'updated_at'
    })
    readonly updatedAt: Date
}
