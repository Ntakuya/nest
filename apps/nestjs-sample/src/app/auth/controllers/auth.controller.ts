import { Body, Controller, Post } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { SignupDto } from '../dtoes/signup.dto';
import { SignupService } from '../services/signup.service';

@Controller('auth')
export class AuthController {
    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.signupService.signup$(signupDto)
    }

    constructor(
        private readonly signupService: SignupService
    ) {
    }
}
