import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/features/prisma/prisma.service';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class RevenusService {
  constructor(private prismaService: PrismaService) {}

  async create(data: any) {
    try {
      const revenu = await this.prismaService.revenus.create({
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
      return revenu;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idSchool?: number) {
    try {
      const whereCond = idSchool ? { idSchool } : {};
      const revenus = await this.prismaService.revenus.findMany({
        where: whereCond,
        orderBy: { date: 'desc' },
      });
      return revenus;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idRev: number) {
    try {
      const revenu = await this.prismaService.revenus.findUniqueOrThrow({
        where: { idRev },
      });
      return revenu;
    } catch (error) {
      throw exception(error);
    }
  }

  async update(idRev: number, data: any) {
    try {
      const revenu = await this.prismaService.revenus.update({
        where: { idRev },
        data: {
          ...data,
          valeur: data.valeur !== undefined ? Number(data.valeur) : undefined,
        },
      });
      return revenu;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idRev: number) {
    try {
      const res = await this.prismaService.revenus.delete({
        where: { idRev },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
