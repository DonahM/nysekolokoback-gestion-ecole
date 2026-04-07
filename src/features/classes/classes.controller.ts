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
import { ClassesService } from './classes.service';
import { CreateClassesDto } from './dto/create-classes.dto';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

  @Post()
  async create(@Body() dto: CreateClassesDto) {
    return this.classesService.create(dto)
  }

  @Get()
  findAll(@Headers('x-user-id') idUser?: string){
    return this.classesService.findAll(idUser ? parseInt(idUser) : undefined)
  }

  @Get(':id')
  findOne(@Param('id') idCls: string) {
    return this.classesService.findOne(+idCls);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idCls: string) {
    return this.classesService.remove(+idCls);
  }

  @Get('/count')
  async count(@Headers('x-user-id') idUser?: string): Promise<number> {
    return this.classesService.count(idUser ? parseInt(idUser) : undefined);
  }

}
