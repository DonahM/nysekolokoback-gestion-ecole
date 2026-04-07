import { Module } from '@nestjs/common';
import { SalairesController } from './salaires.controller';
import { SalairesService } from './salaires.service';

@Module({
    controllers: [SalairesController],
    providers: [SalairesService],
})
export class SalairesModule {}
