import { Module } from '@nestjs/common';
import { StudentsYearsController } from './students_years.controller';
import { StudentsYearsService } from './students_years.service';

@Module({
    controllers: [StudentsYearsController],
    providers: [StudentsYearsService],
})
export class StudentsYearsModule {}
