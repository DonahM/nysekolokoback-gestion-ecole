import { Module } from '@nestjs/common';
import { MatieresService } from './matieres.service';
import { MatieresController } from './matieres.controller';

@Module({
  providers: [MatieresService],
  controllers: [MatieresController]
})
export class MatieresModule {}
