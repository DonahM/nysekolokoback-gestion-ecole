import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/features/prisma/prisma.service';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class FinancesService {
  constructor(private prismaService: PrismaService) {}

  async getBilanMois(idSchool: number, mois: string) {
    try {
      const ecolages = await this.prismaService.ecolages.findMany({
        where: {
          idSchool,
          mois,
          statut: { in: ['Payé', 'Paye'] }
        }
      });
      const totalRevenus = ecolages.reduce((sum, eco) => sum + eco.valeur, 0);

      const salaires = await this.prismaService.salaires.findMany({
        where: {
          idSchool,
          mois,
          statut: { in: ['Payé', 'Paye'] }
        }
      });
      const totalSalaires = salaires.reduce((sum, sal) => sum + sal.valeur, 0);

      const depenses = await this.prismaService.depenses.findMany({
        where: {
          idSchool,
          mois
        }
      });
      const totalDepenses = depenses.reduce((sum, dep) => sum + dep.valeur, 0);

      return {
        revenus: totalRevenus,
        salaires: totalSalaires,
        depenses: totalDepenses,
        charges: totalSalaires + totalDepenses,
        benefice: totalRevenus - (totalSalaires + totalDepenses)
      };
    } catch (error) {
      throw exception(error);
    }
  }

  async getBilanGlobal(idSchool: number) {
    try {
      const year = await this.prismaService.years_schools.findUnique({
        where: { idSchool }
      });

      const ecolages = await this.prismaService.ecolages.findMany({
        where: {
          idSchool,
          statut: { in: ['Payé', 'Paye'] }
        }
      });
      const totalRevenus = ecolages.reduce((sum, eco) => sum + eco.valeur, 0);

      const salaires = await this.prismaService.salaires.findMany({
        where: {
          idSchool,
          statut: { in: ['Payé', 'Paye'] }
        }
      });
      const totalSalaires = salaires.reduce((sum, sal) => sum + sal.valeur, 0);

      const depenses = await this.prismaService.depenses.findMany({
        where: { idSchool }
      });
      const totalDepenses = depenses.reduce((sum, dep) => sum + dep.valeur, 0);

      return {
        annee_scolaire: year ? year.annee_scolaire : "Inconnu",
        revenus: totalRevenus,
        salaires: totalSalaires,
        depenses: totalDepenses,
        charges: totalSalaires + totalDepenses,
        benefice: totalRevenus - (totalSalaires + totalDepenses)
      };
    } catch (error) {
      throw exception(error);
    }
  }
}
