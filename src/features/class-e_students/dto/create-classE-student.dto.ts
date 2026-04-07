import { IsInt } from 'class-validator';

export class CreateClassEStudentDto {
  @IsInt()
  idCls: number;

  @IsInt()
  idEdt: number;
}
