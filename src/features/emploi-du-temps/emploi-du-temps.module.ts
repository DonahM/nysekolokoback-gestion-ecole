import { Module } from '@nestjs/common';
import { EmploiDuTempsService } from './emploi-du-temps.service';
import { EmploiDuTempsController } from './emploi-du-temps.controller';
import { PrismaModule } from 'src/features/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EmploiDuTempsService],
  controllers: [EmploiDuTempsController]
})
export class EmploiDuTempsModule {}
