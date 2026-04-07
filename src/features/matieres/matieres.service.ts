import { HttpException, Injectable } from '@nestjs/common';
import { CreateMatieresDto } from './dto/create-matieres.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { matieres } from '@prisma/client';
import exception from 'src/core/errors/error_handler';
@Injectable()
export class MatieresService {
  constructor(private prismaService: PrismaService) { }
  async create(
    createMatieresDto: CreateMatieresDto,
  ): Promise<matieres | HttpException> {
    try {
      const matieres = await this.prismaService.matieres.create({
        data: {
          name: createMatieresDto.name,
          idSchool: createMatieresDto.idSchool,
          idUser: createMatieresDto.idUser
        },
      });
      return matieres;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idUser?: number) {
    try {
      const whereClause = idUser ? { idUser } : {};
      const matieres = await this.prismaService.matieres.findMany(
        {
          where: whereClause,
          include: {
            notes: true,
          },
        }
      );
      return matieres;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idMat: number) {
    try {
      const matieres = await this.prismaService.matieres.findUniqueOrThrow({
        where: {
          idMat: idMat,
        },
      });
      return matieres;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idMat: number) {
    try {
      const res = await this.prismaService.matieres.delete({
        where: {
          idMat: idMat,
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
      const res = await this.prismaService.matieres.count({ where: whereClause });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
