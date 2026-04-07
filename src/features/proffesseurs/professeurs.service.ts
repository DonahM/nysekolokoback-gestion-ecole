import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateProfesseursDto} from './dto/create-professeurs.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { professeurs} from '@prisma/client';
import exception from 'src/core/errors/error_handler';
@Injectable()
export class ProfesseursService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createProffresseursDto: CreateProfesseursDto,
  ): Promise<professeurs | HttpException> {
    try {
      const proffesseurs = await this.prismaService.professeurs.create({
        data: {
          name: createProffresseursDto.name,
          surname: createProffresseursDto.surname,
          matiere: createProffresseursDto.matiere,
          idSchool: createProffresseursDto.idSchool,
          idUser: createProffresseursDto.idUser
        },
      });
      return proffesseurs;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idUser?: number) {
    try {
      const whereClause = idUser ? { idUser } : {};
      const proff = await this.prismaService.professeurs.findMany(
        {
          where: whereClause,
          include:{
            salaires:true,
            years_schools: true,
          },
        }
      );
      return proff;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idProf: number) {
    try {
      const proff = await this.prismaService.professeurs.findUniqueOrThrow({
        where: {
          idProf: idProf,
        },
        include: {
          salaires: {
            include: {
              years_schools: true
            }
          },
          years_schools: true,
        },
      });
      return proff;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idProf: number) {
    try {
      const res = await this.prismaService.professeurs.delete({
        where: {
          idProf: idProf,
        },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async count(idUser?: number): Promise<number> {
    try {
      const whereClause = idUser ? { idUser } : {};
      const res = await this.prismaService.professeurs.count({ where: whereClause });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
