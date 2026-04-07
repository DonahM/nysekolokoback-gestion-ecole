import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmploiDuTempsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  jour: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  heureDebut: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  heureFin: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  idMat: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  idProf: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  idCls: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  idSchool: number;
}
