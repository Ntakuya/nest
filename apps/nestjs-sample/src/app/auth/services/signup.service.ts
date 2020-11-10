import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, throwError } from 'rxjs';
import { catchError, exhaustMap, finalize, map, } from 'rxjs/operators';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { SignupDto } from '../dtoes/signup.dto';
import { AuthEntity } from '../entities/auth.entity';
import { randomBytes } from 'crypto'

@Injectable()
export class SignupService {

    signup$(dto: SignupDto) {
        const {
            email,
            password,
            userName,
            displayName
        } = dto
        return this.transactionOperator$().pipe(
            exhaustMap(queryRunner => {
                return from(queryRunner.manager.save<AuthEntity>(this.buildAuthEntity({email, password}))).pipe(
                    exhaustMap(auth =>
                        from(queryRunner.manager.save<UserEntity>(this.buildUserEntity({userName, displayName, auth}))).pipe(
                            catchError(error => {
                                return throwError(error)
                            })
                        ),
                    ),
                    exhaustMap(user => {
                        return from(queryRunner.commitTransaction()).pipe(
                            map(() => user)
                        )
                    })
                )
            }),
        )
    }

    private transactionOperator$() {
        const queryRunner = this.connection.createQueryRunner()
        return from(queryRunner.connect()).pipe(
            exhaustMap(() => from(queryRunner.startTransaction()).pipe(
                map(() => queryRunner),
            )),
            catchError(() => {
                return throwError(queryRunner.rollbackTransaction()
            )}),
            finalize(() => {})
        )
    }

    private  buildAuthEntity(authEntity: Partial<AuthEntity>) {
        const signupToken = randomBytes(22).toString('base64').substring(0, 22)
        return this.authRepository.create({
            ...authEntity,
            signupToken,
        })
    }

    private buildUserEntity(userEntity: Partial<UserEntity>) {
        return this.userRepository.create(userEntity)
    }

    constructor(
        private readonly connection: Connection,
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}
}
