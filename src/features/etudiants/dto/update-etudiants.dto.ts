import { ApiProperty, PartialType } from '@nestjs/swagger';
import {  IsString ,IsOptional, IsNumber } from 'class-validator';
import { CreateEtudiantsDto } from './create-etudiants.dto';

export class  UpdateEtudiantsDto extends PartialType(CreateEtudiantsDto){
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  surname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  date_naiss: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lieu_naiss: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  sexe : string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tel: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  adress_edt: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  father: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  jobs_f: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  mother: string;
  
  @IsOptional()
  @ApiProperty()
  @IsString()
  jobs_m: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  tel_parent: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  adresse_parent: string;
  
  @IsOptional()
  @ApiProperty()
  @IsString()
  titeur: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  tel_titeur: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  adress_titeur: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  ecole_anter: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  image: string;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idCls: number;
}
