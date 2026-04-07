import { Module } from '@nestjs/common';
import { ClassEStudentsService } from './class-e_students.service';
import { ClassEStudentsController } from './class-e_students.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ClassEStudentsController],
  providers: [ClassEStudentsService, PrismaService],
})
export class ClassEStudentsModule {}
