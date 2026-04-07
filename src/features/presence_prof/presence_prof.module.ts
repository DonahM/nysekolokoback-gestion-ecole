import { Module } from '@nestjs/common';
import { PresenceProfService } from './presence_prof.service';
import { PresenceProfController } from './presence_prof.controller';
import { PrismaModule } from 'src/features/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PresenceProfController],
  providers: [PresenceProfService],
})
export class PresenceProfModule {}
