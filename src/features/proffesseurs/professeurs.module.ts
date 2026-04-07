import { Module } from '@nestjs/common';
import { ProfesseursService } from './professeurs.service';
import { ProfesseursController } from './professeurs.controller';

@Module({
  providers: [ProfesseursService],
  controllers: [ProfesseursController]
})

export class ProfesseursModule {}
