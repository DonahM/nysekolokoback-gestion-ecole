import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsString, IsOptional } from 'class-validator';

export class CreateProfesseursDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  matiere: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSchool: number;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idUser: number;
}