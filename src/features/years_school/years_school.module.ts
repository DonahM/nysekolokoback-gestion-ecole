import { Module } from '@nestjs/common';
import { YearsSchoolService } from './years_school.service';
import { YearsSchoolController } from './years_school.controller';

@Module({
    providers: [YearsSchoolService],
    controllers: [YearsSchoolController]
})
export class YearsSchoolModule {}
