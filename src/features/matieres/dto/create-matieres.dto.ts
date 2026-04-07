import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsString, IsOptional } from 'class-validator';

export class CreateMatieresDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  name: string;

  // @IsOptional()
  // @ApiProperty()
  // @IsString()
  // titulaire: string;

  // @IsOptional()
  // @ApiProperty()
  // @IsString()
  // num: string;

  // @IsOptional()
  // @ApiProperty()
  // @IsNumber()
  // idEdt: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSchool: number;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idUser: number;
  
}