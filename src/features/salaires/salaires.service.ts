import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateSalairesDto } from './dto/create-salaires.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { salaires} from '@prisma/client';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class SalairesService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createSalairesDto: CreateSalairesDto,
  ): Promise<salaires | HttpException> {
    try {
      const salaires = await this.prismaService.salaires.create({
        data: {
          mois: createSalairesDto.mois,
          statut: createSalairesDto.statut,
          valeur: createSalairesDto.valeur,
          heures_totales: createSalairesDto['heures_totales'] || null,
          date: createSalairesDto.date,
          idProf: createSalairesDto.idProf,
          idSchool: createSalairesDto.idSchool
        },
      });
      return salaires;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idUser?: number) {
    try {
      const whereCond = idUser ? { professeurs: { idUser } } : {};
      const salaires = await this.prismaService.salaires.findMany(
        { where: whereCond }
      );
      return salaires;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idSal: number) {
    try {
      const salaires = await this.prismaService.salaires.findUniqueOrThrow({
        where: {
          idSal: idSal,
        },
      });
      return salaires;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idSal: number) {
    try {
      const res = await this.prismaService.salaires.delete({
        where: {
          idSal: idSal,
        },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async count(idUser?: number): Promise<number> {
    try {
      const whereCond = idUser ? { professeurs: { idUser } } : {};
      const res = await this.prismaService.salaires.count({ where: whereCond });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async calculerSalaire(idProf: number, start: string, end: string) {
    try {
      const prof = await this.prismaService.professeurs.findUnique({
        where: { idProf }
      });
      if (!prof) throw new HttpException('Professeur introuvable', 404);

      // We pull presences for this professor.
      const presences = await this.prismaService.presence_prof.findMany({
        where: { idProf, status: { contains: 'Présent' } }
      });

      // Filter by date dynamically 
      const startMs = new Date(start).getTime();
      const endMs = new Date(end).getTime() + 86400000; // Add 1 day to include end date entirely

      let totalHours = 0;

      for (const pres of presences) {
        if (!pres.date || !pres.heureDebut || !pres.heureFin) continue;
        const pDate = new Date(pres.date).getTime();
        
        // Match bounds if valid dates were passed
        if (!isNaN(startMs) && pDate < startMs) continue;
        if (!isNaN(endMs) && pDate > endMs) continue;

        const [sh, sm] = pres.heureDebut.split(':').map(Number);
        const [eh, em] = pres.heureFin.split(':').map(Number);
        if (!isNaN(sh) && !isNaN(eh)) {
          const h = (eh + (em||0)/60) - (sh + (sm||0)/60);
          if (h > 0) totalHours += h;
        }
      }

      totalHours = Math.round(totalHours * 100) / 100; // Keep two decimal precision
      // Using taux_horaire we added earlier
      const taux = (prof as any).taux_horaire || 0;
      const amount = totalHours * taux;

      return {
        idProf,
        heures_totales: totalHours,
        taux_horaire: taux,
        montant_calcule: amount
      };
    } catch (error) {
      throw exception(error);
    }
  }
}
