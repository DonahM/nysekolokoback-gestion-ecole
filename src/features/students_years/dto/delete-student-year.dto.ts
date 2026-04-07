import { IsInt } from 'class-validator';

export class DeleteStudentYearDto {
  @IsInt()
  idEdt: number;

  @IsInt()
  idSchool: number;
}
