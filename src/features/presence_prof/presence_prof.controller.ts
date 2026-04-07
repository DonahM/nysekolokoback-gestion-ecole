import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
import { PresenceProfService } from './presence_prof.service';
import { CreatePresenceProfDto } from './dto/create-presence_prof.dto';
import { UpdatePresenceProfDto } from './dto/update-presence_prof.dto';

@Controller('presence-prof')
export class PresenceProfController {
  constructor(private readonly presenceProfService: PresenceProfService) {}

  @Post()
  create(@Body() createPresenceProfDto: CreatePresenceProfDto, @Headers('x-user-id') idUser?: string) {
    if (idUser && !createPresenceProfDto.idUser) {
      createPresenceProfDto.idUser = parseInt(idUser);
    }
    return this.presenceProfService.create(createPresenceProfDto);
  }

  @Get()
  findAll(
    @Headers('x-user-id') idUser?: string,
    @Query('idSchool') idSchool?: string,
    @Query('date') date?: string,
  ) {
    return this.presenceProfService.findAll(
      idUser ? parseInt(idUser) : undefined,
      idSchool ? parseInt(idSchool) : undefined,
      date
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.presenceProfService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePresenceProfDto: UpdatePresenceProfDto,
  ) {
    return this.presenceProfService.update(id, updatePresenceProfDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.presenceProfService.remove(id);
  }
}
