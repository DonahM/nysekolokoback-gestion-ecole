import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/features/prisma/prisma.service';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class DepensesService {
  constructor(private prismaService: PrismaService) {}

  async create(data: any) {
    try {
      const depense = await this.prismaService.depenses.create({
        data: {
          titre: data.titre,
          description: data.description,
          categorie: data.categorie,
          valeur: data.valeur ? Number(data.valeur) : 0,
          date: data.date,
          mois: data.mois,
          idSchool: data.idSchool ? Number(data.idSchool) : undefined,
          idUser: data.idUser ? Number(data.idUser) : undefined
        },
      });
      return depense;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idSchool?: number) {
    try {
      const whereCond = idSchool ? { idSchool } : {};
      const depenses = await this.prismaService.depenses.findMany({
        where: whereCond,
        orderBy: { date: 'desc' },
      });
      return depenses;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idDep: number) {
    try {
      const depense = await this.prismaService.depenses.findUniqueOrThrow({
        where: { idDep },
      });
      return depense;
    } catch (error) {
      throw exception(error);
    }
  }

  async update(idDep: number, data: any) {
    try {
      const depense = await this.prismaService.depenses.update({
        where: { idDep },
        data: {
          ...data,
          valeur: data.valeur !== undefined ? Number(data.valeur) : undefined,
        },
      });
      return depense;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idDep: number) {
    try {
      const res = await this.prismaService.depenses.delete({
        where: { idDep },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
