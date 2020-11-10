import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { SignupService } from './services/signup.service';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, UserEntity])],
    providers: [SignupService],
    controllers: [AuthController]
})
export class AuthModule {}
