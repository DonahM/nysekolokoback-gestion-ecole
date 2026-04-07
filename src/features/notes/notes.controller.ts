import { Body, Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    Headers,
  } from '@nestjs/common';
  import { NotesService } from './notes.service';
  import { notes} from '@prisma/client';
  import { CreateNotesDto } from './dto/create-notes.dto';
  import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
  import UploadFileUsecase from 'src/core/usecases/upload_file_usecase';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

  @Get('/list')
  async fetchDatabases(
    @Query('enablePagination') enablePagination: boolean = false,
    @Query('page') page: string = '1',
    @Query('itemsPerPage') itemsPerPage: string = '5',
    @Headers('x-user-id') idUser?: string,
  ): Promise<notes[] | null> {
    const pageNum = parseInt(page);
    const items = parseInt(itemsPerPage);
    return this.notesService.fetchDatabases(
      enablePagination,
      pageNum,
      items,
      idUser ? parseInt(idUser) : undefined
    );
  }

  @Get('/directory/:dir_name')
  async serveFiles(
    @Param('dir_name') dirName: string,
  ): Promise<string[] | null> {
    const files = this.notesService.serveFiles(dirName);
    return files;
  }
  
//   @Post()
// async create(@Body() dto: CreateNotesDto): Promise<notes | HttpException> {
//   return await this.notesService.create(dto);
// }
@Post()
  async create(@Body() createNotesDto: CreateNotesDto): Promise<notes | HttpException> {
    try {
      const newNote = await this.notesService.create(createNotesDto);
      return newNote;
    } catch (error) {
      // Retourner une exception HTTP en cas d'erreur
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @Post()
  // create(@Body() dto: CreateNotesDto) {
  //   return this.notesService.create(dto);
  // }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Get('check-duplicate/:idEdt/:idMat/:idSem/:idSchool')
  async checkDuplicate(
    @Param('idEdt') idEdt: string,
    @Param('idMat') idMat: string,
    @Param('idSem') idSem: string,
    @Param('idSchool') idSchool: string,
  ): Promise<{ exists: boolean }> {
    return this.notesService.checkDuplicate(
      parseInt(idEdt),
      parseInt(idMat),
      parseInt(idSem),
      parseInt(idSchool),
    );
  }

  @Get()
  findAll(@Headers('x-user-id') idUser?: string) {
    return this.notesService.findAll(idUser ? parseInt(idUser) : undefined);
  }

  @Get('/notes/:id')
  async findByEtudiants(@Param('id') idEdt: number): Promise<notes[]> {
    return this.notesService.findByEtudiants(+idEdt);
  }

  @Get('/count')
  async count(@Headers('x-user-id') idUser?: string): Promise<number> {
    return this.notesService.count(idUser ? parseInt(idUser) : undefined);
  }

  // @Patch(':id')
  // async update(@Param('id') idNot: number, @Body() updateEtudiantsDto: UpdateEtudiantsDto) {
  //   return this.notesService.update(+idNot, updateEtudiantsDto);
  // }

  @Get(':id')
  async findOne(@Param('id') idNot: string) {
    const id = parseInt(idNot, 10); // Convertir l'ID en nombre
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', 400); // Gérer les ID invalides
    }
    return this.notesService.findOne(id);
  }

  

  @Delete(':id')
  remove(@Param('id') IdCom: string) {
    return this.notesService.remove(+IdCom);
  }
}
