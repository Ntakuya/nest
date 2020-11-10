import { IsEmail, IsISSN, IsString } from 'class-validator';

export class SignupDto {
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    passwordConfirmation: string

    @IsString()
    userName: string

    @IsString()
    displayName: string
}
