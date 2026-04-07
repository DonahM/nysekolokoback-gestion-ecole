import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Headers } from '@nestjs/common';
import { EmploiDuTempsService } from './emploi-du-temps.service';
import { CreateEmploiDuTempsDto } from './dto/create-emploi-du-temps.dto';
import { emploi_du_temps } from '@prisma/client';

@Controller('emploi-du-temps')
export class EmploiDuTempsController {
  constructor(private readonly service: EmploiDuTempsService) {}

  @Post()
  async create(@Body() dto: CreateEmploiDuTempsDto): Promise<emploi_du_temps | HttpException> {
    return this.service.create(dto);
  }

  @Get('classe/:idCls/year/:idSchool')
  async findByClassAndYear(
    @Param('idCls') idCls: string,
    @Param('idSchool') idSchool: string,
    @Headers('x-user-id') idUser?: string,
  ): Promise<emploi_du_temps[]> {
    return this.service.findByClassAndYear(+idCls, +idSchool, idUser ? parseInt(idUser, 10) : undefined);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
