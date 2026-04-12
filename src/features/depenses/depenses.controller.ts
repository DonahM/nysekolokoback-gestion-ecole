import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepensesService } from './depenses.service';

@Controller('depenses')
export class DepensesController {
  constructor(private readonly depensesService: DepensesService) {}

  @Post()
  create(@Body() createDepenseDto: any) {
    return this.depensesService.create(createDepenseDto);
  }

  @Get()
  findAll(@Query('idSchool') idSchool?: string) {
    return this.depensesService.findAll(idSchool ? +idSchool : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepenseDto: any) {
    return this.depensesService.update(+id, updateDepenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depensesService.remove(+id);
  }
}
