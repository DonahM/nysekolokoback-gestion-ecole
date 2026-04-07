import { IsInt } from 'class-validator';

export class DeleteClassEStudentDto {
  @IsInt()
  idCls: number;

  @IsInt()
  idEdt: number;
}
