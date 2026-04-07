import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateClassesDto } from './dto/create-classes.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { classE} from '@prisma/client';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class ClassesService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createClassesDto: CreateClassesDto,
  ): Promise<classE | HttpException> {
    try {
      const classE = await this.prismaService.classE.create({
        data: {
          name: createClassesDto.name,
          titulaire: createClassesDto.titulaire,
          num: createClassesDto.num,
          idSchool: createClassesDto.idSchool,
          idUser: createClassesDto.idUser
        },
      });
      return classE;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idUser?: number) {
    try {
      const whereClause = idUser ? { idUser } : {};
      const classes = await this.prismaService.classE.findMany(
        {
          where: whereClause,
          include:{
            etudiants:true,
            years_schools: true,
            notes: true
          },
        }
      );
      return classes;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idCls: number) {
    try {
      const classes = await this.prismaService.classE.findUniqueOrThrow({
        where: {
          idCls: idCls,
        },
        include: {
          years_schools: true,
        },
      });
      return classes;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idCls: number) {
    try {
      const res = await this.prismaService.classE.delete({
        where: {
          idCls: idCls,
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
      const res = await this.prismaService.classE.count({ where: whereClause });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

}
