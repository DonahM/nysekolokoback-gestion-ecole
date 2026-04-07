import { Controller, Post, Delete, Body } from '@nestjs/common';
import { StudentsYearsService } from './students_years.service';
import { CreateStudentYearDto } from './dto/create-student-year.dto';
import { DeleteStudentYearDto } from './dto/delete-student-year.dto';

@Controller('students-years')
export class StudentsYearsController {
    constructor(private readonly studentsYearsService: StudentsYearsService) {}

  @Post()
  async addStudentToYear(@Body() data: CreateStudentYearDto) {
    return this.studentsYearsService.addStudentToYear(data);
  }

  @Delete()
  async removeStudentFromYear(@Body() data: DeleteStudentYearDto) {
    return this.studentsYearsService.removeStudentFromYear(data);
  }
}
