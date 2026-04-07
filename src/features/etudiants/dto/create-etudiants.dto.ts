import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString ,IsOptional } from 'class-validator';

export class CreateEtudiantsDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  date_naiss: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  lieu_naiss: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  sexe : string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  tel: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  adress_edt: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  matricule: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  father: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  jobs_f: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  mother: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  jobs_m: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  tel_parent: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  ecole_anter: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
  

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idUser: number;
}
