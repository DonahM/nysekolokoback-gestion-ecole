
import { IsInt } from 'class-validator';

export class CreateStudentYearDto {
  @IsInt()
  idEdt: number;

  @IsInt()
  idSchool: number;
}
