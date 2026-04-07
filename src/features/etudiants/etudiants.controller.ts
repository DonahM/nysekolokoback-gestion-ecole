import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    ParseIntPipe,
    Headers
  } from '@nestjs/common';
  import { EtudiantsService } from './etudiants.service';
  import { etudiants} from '@prisma/client';
  import { CreateEtudiantsDto } from './dto/create-etudiants.dto';
  import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
  import UploadFileUsecase from 'src/core/usecases/upload_file_usecase';
import { UpdateEtudiantsDto } from './dto/update-etudiants.dto';

@Controller('etudiants')
export class EtudiantsController {
    constructor(private readonly etudiantsService: EtudiantsService) {}

  @Get('/list')
  async fetchDatabases(
    @Query('enablePagination') enablePagination: boolean = false,
    @Query('page') page: string = '1',
    @Query('itemsPerPage') itemsPerPage: string = '5',
    @Headers('x-user-id') idUser?: string
  ): Promise<etudiants[] | null> {
    const pageNum = parseInt(page);
    const items = parseInt(itemsPerPage);
    const parsedIdUser = idUser ? parseInt(idUser) : undefined;
    return this.etudiantsService.fetchDatabases(
      enablePagination,
      pageNum,
      items,
      parsedIdUser
    );
  }

  @Get('/directory/:dir_name')
  async serveFiles(
    @Param('dir_name') dirName: string,
  ): Promise<string[] | null> {
    const files = this.etudiantsService.serveFiles(dirName);
    return files;
  }
  
  @Post()
  create(@Body() dto: CreateEtudiantsDto) {
    console.log(dto.idUser)
    return this.etudiantsService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', 400);
    }
    const filename = UploadFileUsecase('etudiants', file);
    return { filePath: filename };
  }

  @Get()
  findAll(@Headers('x-user-id') idUser?: string){
    return this.etudiantsService.findAll(idUser ? parseInt(idUser) : undefined);
  }

  @Get('/etudiants/:id')
  async findByEtudiants(@Param('id') idEdt: number): Promise<etudiants[]> {
    return this.etudiantsService.findByEtudiants(+idEdt);
  }

  @Get('id/:idEdt')
  async findByMatricule(@Param('idEdt', ParseIntPipe) idEdt: number): Promise<etudiants[]> {
    return this.etudiantsService.findByMatricule(idEdt);
  }

  @Get('/count')
  async count(@Headers('x-user-id') idUser?: string): Promise<number> {
    return this.etudiantsService.count(idUser ? parseInt(idUser) : undefined);
  }

  @Patch(':id')
  async update(@Param('id') IdEdt: number, @Body() updateEtudiantsDto: UpdateEtudiantsDto) {
    return this.etudiantsService.update(+IdEdt, updateEtudiantsDto);
  }

  @Get(':id')
  async findOne(@Param('id') idEdt: string) {
  const id = parseInt(idEdt, 10); // Convertir l'ID en nombre
  if (isNaN(id)) {
    throw new HttpException('Invalid ID format', 400); // Gérer les ID invalides
  }
  return this.etudiantsService.findOne(id);
}

  @Delete(':id')
  remove(@Param('id') IdCom: string) {
    return this.etudiantsService.remove(+IdCom);
  }

  // @Patch(':id')
  // @UseInterceptors(FileInterceptor('file'))
  // update(
  //   @Param('id') id: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {}
}
