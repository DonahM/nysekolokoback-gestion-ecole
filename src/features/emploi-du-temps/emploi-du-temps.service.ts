import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { emploi_du_temps } from '@prisma/client';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { CreateEmploiDuTempsDto } from './dto/create-emploi-du-temps.dto';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class EmploiDuTempsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateEmploiDuTempsDto): Promise<emploi_du_temps | HttpException> {
    try {
      if (!dto.jour || !dto.heureDebut || !dto.heureFin || !dto.idMat || !dto.idProf || !dto.idCls || !dto.idSchool) {
        throw new HttpException('Tous les champs sont requis', HttpStatus.BAD_REQUEST);
      }

      const newEmploi = await this.prismaService.emploi_du_temps.create({
        data: {
          jour: dto.jour,
          heureDebut: dto.heureDebut,
          heureFin: dto.heureFin,
          matieres: { connect: { idMat: dto.idMat } },
          professeurs: { connect: { idProf: dto.idProf } },
          classE: { connect: { idCls: dto.idCls } },
          years_schools: { connect: { idSchool: dto.idSchool } },
        }
      });
      return newEmploi;
    } catch (error) {
      throw exception(error);
    }
  }

  async findByClassAndYear(idCls: number, idSchool: number, idUser?: number): Promise<emploi_du_temps[]> {
    try {
      const schedule = await this.prismaService.emploi_du_temps.findMany({
        where: {
            idCls: idCls,
            idSchool: idSchool,
            classE: idUser ? { idUser } : undefined
        },
        include: {
          matieres: true,
          professeurs: true,
        },
        orderBy: [
            { heureDebut: 'asc' }
        ]
      });
      return schedule;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(id: number): Promise<emploi_du_temps | unknown> {
    try {
      const res = await this.prismaService.emploi_du_temps.delete({
        where: { id: id },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
