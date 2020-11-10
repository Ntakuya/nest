import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../services/auth.service' 
import { from, of, throwError } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor( private readonly authService: AuthService ) {
        super({usernameField: 'email'})
    }

    validate(email: string, password: string) {
        return from(this.authService.validate$(email, password)).pipe(
            switchMap(auth => {
                if(!auth) {
                    return throwError(new UnauthorizedException())
                }
                return of(auth)
            })
        )
    }
}