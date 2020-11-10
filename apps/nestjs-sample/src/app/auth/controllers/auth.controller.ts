import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SignupDto } from '../dtoes/signup.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginService } from '../services/login.service';
import { SignupService } from '../services/signup.service';

@Controller('auth')
export class AuthController {
    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.signupService.signup$(signupDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return of(req).pipe(
            switchMap(auth => this.loginService.login$(auth))
        )
    }

    constructor(
        private readonly signupService: SignupService,
        private readonly loginService: LoginService
    ) {
    }
}
