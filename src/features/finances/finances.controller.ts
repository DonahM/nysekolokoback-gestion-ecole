import { Controller, Get, Query } from '@nestjs/common';
import { FinancesService } from './finances.service';

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Get('bilan/mois')
  getBilanMois(
    @Query('idSchool') idSchool: string,
    @Query('mois') mois: string
  ) {
    return this.financesService.getBilanMois(+idSchool, mois);
  }
  
  @Get('bilan/all')
  getBilanGlobal(
    @Query('idSchool') idSchool: string
  ) {
    return this.financesService.getBilanGlobal(+idSchool);
  }
}
