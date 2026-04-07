import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsString, IsOptional } from 'class-validator';

export class CreatesemestreDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  name: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSchool: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idUser: number;
}