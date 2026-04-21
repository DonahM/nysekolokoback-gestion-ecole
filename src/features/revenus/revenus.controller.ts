import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RevenusService } from './revenus.service';

@Controller('revenus')
export class RevenusController {
  constructor(private readonly revenusService: RevenusService) {}

  @Post()
  create(@Body() createRevenuDto: any) {
    return this.revenusService.create(createRevenuDto);
  }

  @Get()
  findAll(@Query('idSchool') idSchool?: string) {
    return this.revenusService.findAll(idSchool ? +idSchool : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenuDto: any) {
    return this.revenusService.update(+id, updateRevenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenusService.remove(+id);
  }
}
