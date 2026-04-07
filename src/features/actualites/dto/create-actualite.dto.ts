import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActualiteDto {
  @IsNotEmpty()
  @IsString()
  texte: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idUser?: number;
}
