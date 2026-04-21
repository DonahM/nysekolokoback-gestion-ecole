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
import { ProfesseursService } from './professeurs.service';
import { CreateProfesseursDto } from './dto/create-professeurs.dto';

@Controller('professeurs')
export class ProfesseursController {
    constructor(private readonly proffesseursservice: ProfesseursService) {}

  @Post()
  async create(@Body() dto: CreateProfesseursDto) {
    return this.proffesseursservice.create(dto)
  }

  @Get()
  findAll(@Headers('x-user-id') idUser?: string){
    return this.proffesseursservice.findAll(idUser ? parseInt(idUser) : undefined)
  }

  @Get(':id')
  findOne(@Param('id') idProf: string) {
    return this.proffesseursservice.findOne(+idProf);
  }

  @Patch(':id')
  async update(@Param('id') idProf: string, @Body() updateDto: any) {
    return this.proffesseursservice.update(+idProf, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') idProf: string) {
    return this.proffesseursservice.remove(+idProf);
  }

  @Get('/count')
  async count(@Headers('x-user-id') idUser?: string): Promise<number> {
    return this.proffesseursservice.count(idUser ? parseInt(idUser) : undefined);
  }

  @Post(':id/re-enroll')
  async reEnroll(@Param('id') idProf: string, @Body('idSchool') idSchool: number) {
    if (!idSchool) {
      throw new HttpException('idSchool is required', 400);
    }
    return this.proffesseursservice.reEnroll(+idProf, +idSchool);
  }
}
