import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePresenceProfDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  heureDebut: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  heureFin: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  status: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  remarque?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  idProf: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  idSchool: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  idUser?: number;
}
