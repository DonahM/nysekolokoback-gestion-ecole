import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentYearDto } from './dto/create-student-year.dto';
import { DeleteStudentYearDto } from './dto/delete-student-year.dto';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class StudentsYearsService {
  constructor(private readonly prisma: PrismaService) {}

  async addStudentToYear(data: CreateStudentYearDto) {
    try {
      return await this.prisma.students_Years.create({ data });
    } catch (error) {
      throw exception(error);
    }
  }

  async removeStudentFromYear(data: DeleteStudentYearDto) {
    try {
      const record = await this.prisma.students_Years.findFirst({
        where: { 
          idEdt: data.idEdt, 
          idSchool: data.idSchool },
      });

      if (!record) throw new NotFoundException('Association non trouvée.');

      return await this.prisma.students_Years.delete({ where: { id: record.id } });
    } catch (error) {
      throw exception(error);
    }
  }
}
