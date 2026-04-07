import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class AuthClientDto {
  @IsNumber()
  @IsNotEmpty()
  idEdt: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
