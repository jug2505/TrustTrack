import {
    IsDateString,
    IsNotEmpty,
    IsNumberString,
    IsString
} from 'class-validator';

export class ApplicationDto {
    @IsNotEmpty()
    @IsNumberString()
    clientId: string;


    @IsNotEmpty()
    @IsDateString()
    applicationDate: string;

    @IsNotEmpty()
    @IsDateString()
    expirationDate: string;


    @IsNotEmpty()
    @IsNumberString()
    loanAmount: string;

    @IsNotEmpty()
    @IsString()
    purpose: string;
}
