import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { CreatePresenceProfDto } from './dto/create-presence_prof.dto';
import { UpdatePresenceProfDto } from './dto/update-presence_prof.dto';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class PresenceProfService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreatePresenceProfDto) {
    try {
      const db = await this.prismaService.presence_prof.create({
        data: {
          date: dto.date,
          heureDebut: dto.heureDebut,
          heureFin: dto.heureFin,
          status: dto.status,
          remarque: dto.remarque || '',
          idProf: dto.idProf,
          idSchool: dto.idSchool,
          idUser: dto.idUser,
        },
      });
      return db;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idUser?: number, idSchool?: number, date?: string) {
    try {
      const whereClause: any = {};
      if (idUser) whereClause.idUser = idUser;
      if (idSchool) whereClause.idSchool = idSchool;
      if (date) whereClause.date = date;
      
      const presences = await this.prismaService.presence_prof.findMany({
        where: whereClause,
        include: {
          professeurs: true,
        },
      });
      return presences;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.presence_prof.findUniqueOrThrow({
        where: { idPresence: id },
        include: {
          professeurs: true,
        },
      });
    } catch (error) {
      throw exception(error);
    }
  }

  async update(id: number, dto: UpdatePresenceProfDto) {
    try {
      return await this.prismaService.presence_prof.update({
        where: { idPresence: id },
        data: {
          date: dto.date,
          heureDebut: dto.heureDebut,
          heureFin: dto.heureFin,
          status: dto.status,
          remarque: dto.remarque,
          idProf: dto.idProf,
          idSchool: dto.idSchool,
          idUser: dto.idUser,
        },
      });
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.presence_prof.delete({
        where: { idPresence: id },
      });
    } catch (error) {
      throw exception(error);
    }
  }
}
