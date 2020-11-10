import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entities/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authEntity: Repository<AuthEntity>,
    ) {}

    validate$(email: string, password: string) {
        return this.findByEntity({email, password})
    }

    findByEntity(authEntity: Partial<AuthEntity>) {
        return from(this.authEntity.findOne(authEntity)).pipe(
            map(({ password, ...auth }) => auth)
        )
    }
}
