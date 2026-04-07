import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsString, IsOptional } from 'class-validator';

export class CreateEcolagesDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  mois: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  statut: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  valeur: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  date: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idEdt: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSchool: number;
  
}
