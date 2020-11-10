import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class LoginService {
    login$(auth: { email: string, id: number }) {
        const payload = { email: auth.email, sub: auth.id }
        return of(
            {
                access_token: this.jwtService.sign(payload)
            }
        )
    }

    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService
    ) {}
}
