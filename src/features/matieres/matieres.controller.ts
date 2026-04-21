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
import { MatieresService } from './matieres.service';
import { CreateMatieresDto } from './dto/create-matieres.dto';

@Controller('matieres')
export class MatieresController {
    constructor(private readonly matieresservice: MatieresService) {}

  @Post()
  async create(@Body() dto: CreateMatieresDto) {
    return this.matieresservice.create(dto)
  }

  @Get()
  findAll(@Headers('x-user-id') idUser?: string){
    return this.matieresservice.findAll(idUser ? parseInt(idUser) : undefined)
  }

  @Get(':id')
  findOne(@Param('id') idCls: string) {
    return this.matieresservice.findOne(+idCls);
  }

  @Patch(':id')
  async update(@Param('id') idMat: string, @Body() dto: CreateMatieresDto) {
    return this.matieresservice.update(+idMat, dto);
  }

  @Delete(':id')
  async remove(@Param('id') idCls: string) {
    return this.matieresservice.remove(+idCls);
  }

  @Get('/count')
  async count(@Headers('x-user-id') idUser?: string): Promise<number> {
    return this.matieresservice.count(idUser ? parseInt(idUser) : undefined);
  }

}
