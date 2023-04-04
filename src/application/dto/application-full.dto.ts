import {
    IsDateString,
    IsNotEmpty,
    IsNumberString, IsObject,
    IsString, ValidateNested
} from 'class-validator';
import { ClientDto } from '../../client/dto';
import { Type } from 'class-transformer';

export class ApplicationFullDto {
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => ClientDto)
    client: ClientDto;

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
