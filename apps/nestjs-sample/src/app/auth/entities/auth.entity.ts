import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { UserStatus } from '../models/user-status';

@Entity({
    name: 'authes'
})
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        // unique: true
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @Column({
        name: 'signup_token',
        nullable: true
    })
    signupToken: string

    @Column({
        nullable: false,
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.pending
    })
    status: UserStatus

    @OneToOne(() => UserEntity, user => user.auth, {
        nullable: true
    })
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @CreateDateColumn({
        name: 'created_at'
    })
    readonly createdAt: Date

    @UpdateDateColumn({
        name: 'updated_at'
    })
    readonly updatedAt: Date
}
