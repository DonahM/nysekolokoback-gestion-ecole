import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ClassEStudentsService } from './class-e_students.service';
import { CreateClassEStudentDto } from './dto/create-classE-student.dto';
import { DeleteClassEStudentDto } from './dto/delete-classE-student.dto';

@Controller('class-e-students')
export class ClassEStudentsController {
  constructor(private readonly classEStudentsService: ClassEStudentsService) {}

  @Post()
  async addStudentToClass(@Body() data: CreateClassEStudentDto) {
    return this.classEStudentsService.addStudentToClass(data);
  }

  @Delete()
  async removeStudentFromClass(@Body() data: DeleteClassEStudentDto) {
    return this.classEStudentsService.removeStudentFromClass(data);
  }

  @Get('class/:idCls')
  async getStudentsByClass(@Param('idCls') idCls: number) {
    return this.classEStudentsService.getStudentsByClass(Number(idCls));
  }

  @Get('student/:idEdt')
  async getClassesByStudent(@Param('idEdt') idEdt: number) {
    return this.classEStudentsService.getClassesByStudent(Number(idEdt));
  }
}
