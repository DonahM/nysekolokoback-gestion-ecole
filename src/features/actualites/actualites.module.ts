import { Module } from '@nestjs/common';
import { ActualitesService } from './actualites.service';
import { ActualitesController } from './actualites.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActualitesController],
  providers: [ActualitesService],
})
export class ActualitesModule {}
