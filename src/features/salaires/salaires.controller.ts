import { Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
    UploadedFile,
    HttpException,
    Headers,
 } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SalairesService } from './salaires.service';
import { CreateSalairesDto } from './dto/create-salaires.dto';

@Controller('salaires')
export class SalairesController {
    constructor(private readonly salairesService: SalairesService) {}

  @Post()
  async create(@Body() dto: CreateSalairesDto) {
    return this.salairesService.create(dto)
  }

  @Get('calcul/:idProf')
  calculerSalaire(
    @Param('idProf') idProf: string,
    @Query('start') start: string,
    @Query('end') end: string
  ) {
    return this.salairesService.calculerSalaire(+idProf, start, end);
  }

  @Get()
  findAll(@Headers('x-user-id') idUser?: string){
    return this.salairesService.findAll(idUser ? parseInt(idUser, 10) : undefined)
  }

  @Get(':id')
  findOne(@Param('id') idCls: string) {
    return this.salairesService.findOne(+idCls);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idCls: string) {
    return this.salairesService.remove(+idCls);
  }

  @Get('/count')
  async count(@Headers('x-user-id') idUser?: string): Promise<number> {
    return this.salairesService.count(idUser ? parseInt(idUser, 10) : undefined);
  }
}
