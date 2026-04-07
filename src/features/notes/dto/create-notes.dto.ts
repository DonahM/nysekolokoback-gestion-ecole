import { ApiProperty } from '@nestjs/swagger';
import { IsNumber ,IsOptional} from 'class-validator';

export class CreateNotesDto {
  @ApiProperty()
  @ApiProperty()
  @IsNumber()
  note: number;

  @ApiProperty()
  @ApiProperty()
  @IsNumber()
  coefficient: number;

  @ApiProperty()
  @ApiProperty()
  @IsNumber()
  idEdt: number;

  @ApiProperty()
  @ApiProperty()
  @IsNumber()
  idMat: number;

  @ApiProperty()
  @ApiProperty()
  @IsNumber()
  idSchool: number;

  @ApiProperty()
  @ApiProperty()
  @IsNumber()
  idSem: number;

  @ApiProperty()
  @ApiProperty()
  @IsNumber()
  idCls: number;

}
