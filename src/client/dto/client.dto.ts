import {
    IsDateString,
    IsEmail, IsMobilePhone,
    IsNotEmpty,
    IsNumberString,
    IsString
} from 'class-validator';

export class ClientDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    patronym: string;

    @IsNotEmpty()
    @IsMobilePhone()
    mobilePhone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @IsDateString()
    birthDate: string;

    @IsNotEmpty()
    @IsNumberString()
    gender: string;


    @IsNotEmpty()
    @IsString()
    passport: string;

    @IsNotEmpty()
    @IsString()
    inn: string;

    @IsNotEmpty()
    @IsString()
    snils: string;


    @IsNotEmpty()
    @IsString()
    address: string;


    @IsNotEmpty()
    @IsString()
    education: string;

    @IsNotEmpty()
    @IsNumberString()
    income: string;

    @IsNotEmpty()
    @IsString()
    incomeSource: string;
}
