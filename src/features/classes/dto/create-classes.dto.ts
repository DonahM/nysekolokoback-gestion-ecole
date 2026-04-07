import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsString, IsOptional } from 'class-validator';

export class CreateClassesDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  titulaire: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  num: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSchool: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idUser: number;
  
}
