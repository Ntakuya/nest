import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, throwError } from 'rxjs';
import { catchError, exhaustMap, finalize, map, } from 'rxjs/operators';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { SignupDto } from '../dtoes/signup.dto';
import { AuthEntity } from '../entities/auth.entity';

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
                return from(queryRunner.manager.save<AuthEntity>(this.authRepository.create({email, password}))).pipe(
                    exhaustMap(auth =>
                        from(queryRunner.manager.save<UserEntity>(this.userRepository.create({userName, displayName, auth})))
                    ),
                    exhaustMap(sample => {
                        return from(queryRunner.commitTransaction()).pipe(
                            map(() => sample)
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

    constructor(
        private readonly connection: Connection,
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}
}
