import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsString, IsOptional } from 'class-validator';

export class CreateSalairesDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  mois: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  statut: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  valeur: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  heures_totales?: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  date: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idProf: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSchool: number;
  
}
