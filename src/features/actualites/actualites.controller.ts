import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { ActualitesService } from './actualites.service';
import { CreateActualiteDto } from './dto/create-actualite.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

const storage = diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './public/upload/actualites';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const res = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
    cb(null, res);
  },
});

@Controller('actualites')
export class ActualitesController {
  constructor(private readonly actualitesService: ActualitesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  create(
    @Body() createActualiteDto: CreateActualiteDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.actualitesService.create(createActualiteDto, file);
  }

  @Get()
  findAll() {
    return this.actualitesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.actualitesService.remove(+id);
  }
}
