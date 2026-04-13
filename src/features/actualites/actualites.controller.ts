import { Controller, Get, Post, Options, Body, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, UseGuards, Req, Res, Headers } from '@nestjs/common';
import { ActualitesService } from './actualites.service';
import { CreateActualiteDto } from './dto/create-actualite.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { Request, Response } from 'express';

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
  @UseInterceptors(FileInterceptor('file', { 
    storage,
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB
    },
    fileFilter: (req, file, cb) => {
      // Accepter tous les types de fichiers pour l'éditeur de texte
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|avi|mov|wmv|flv|webm|pdf|doc|docx|txt)$/)) {
        return cb(new Error('Type de fichier non supporté'), false);
      }
      cb(null, true);
    },
  }))
  create(
    @Body() createActualiteDto: CreateActualiteDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Headers() headers: Record<string, string>,
  ) {
    // Headers pour l'éditeur de texte
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Disposition');
    
    try {
      const result = this.actualitesService.create(createActualiteDto, file);
      return result;
    } catch (error) {
      console.error('Erreur lors de la création de l\'actualité:', error);
      throw error;
    }
  }

  @Options()
  handleOptions(@Req() req: Request, @Res() res: Response) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires, X-Frame-Options, Content-Disposition, Content-Length, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '3600');
    res.sendStatus(200);
  }

  @Get()
  findAll(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    return this.actualitesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    return this.actualitesService.remove(+id);
  }
}
