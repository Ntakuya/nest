import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { AuthService } from './services/auth.service';
import { SignupService } from './services/signup.service';
import { AuthController } from './controllers/auth.controller';
import { UserEntity } from '../user/entities/user.entity';
import { LoginService } from './services/login.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './consts/jwt-secret';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([AuthEntity, UserEntity]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3d' }
    }),
  ],
  providers: [AuthService, SignupService, LoginService, LocalStrategy, LocalAuthGuard, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard]
})
export class AuthModule {}
