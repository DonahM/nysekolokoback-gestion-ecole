import { Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Headers,
    UseInterceptors,
    UploadedFile,
    HttpException,
 } from '@nestjs/common';
 
import { FileInterceptor } from '@nestjs/platform-express';
import { EcolagesService } from './ecolages.service';
import { CreateEcolagesDto } from './dto/create-ecolages.dto';

@Controller('ecolages')
export class EcolagesController {
    constructor(private readonly ecolagesService: EcolagesService) {}
  @Post()
  async create(@Body() dto: CreateEcolagesDto) {
    return this.ecolagesService.create(dto)
  }

  @Get('notifications/unpaid')
  getUnpaidNotifications(@Headers('x-user-id') idUserStr: string) {
    return this.ecolagesService.getUnpaidNotifications(idUserStr);
  }

  @Get('unpaid/:idEdt')
  getUnpaidStudent(@Param('idEdt') idEdtStr: string) {
    const idEdt = parseInt(idEdtStr, 10);
    if (isNaN(idEdt)) throw new HttpException('Invalid student ID', 400);
    return this.ecolagesService.getUnpaidStudent(idEdt);
  }

  @Get()
  findAll(@Headers('x-user-id') idUser?: string){
    return this.ecolagesService.findAll(idUser ? parseInt(idUser, 10) : undefined)
  }

  @Get(':id')
  findOne(@Param('id') idEco: string) {
    return this.ecolagesService.findOne(+idEco);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idEco: string) {
    return this.ecolagesService.remove(+idEco);
  }

  @Get('/count')
  async count(@Headers('x-user-id') idUser?: string): Promise<number> {
    return this.ecolagesService.count(idUser ? parseInt(idUser, 10) : undefined);
  }
}
