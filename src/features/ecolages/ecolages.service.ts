import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateEcolagesDto } from './dto/create-ecolages.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { ecolages} from '@prisma/client';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class EcolagesService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createEcolagesDto: CreateEcolagesDto,
  ): Promise<ecolages | HttpException> {
    try {
      const ecolages = await this.prismaService.ecolages.create({
        data: {
          mois: createEcolagesDto.mois,
          statut: createEcolagesDto.statut,
          valeur: createEcolagesDto.valeur,
          date: createEcolagesDto.date,
          idEdt: createEcolagesDto.idEdt,
          idSchool: createEcolagesDto.idSchool
        },
      });
      return ecolages;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(idUser?: number) {
    try {
      const whereCond = idUser ? { etudiants: { idUser } } : {};
      const ecolages = await this.prismaService.ecolages.findMany({
        where: whereCond,
        include: {
          years_schools: {
            select: {
              annee_scolaire: true, // Inclure l'année scolaire
            },
          },
          etudiants: true
        },
      });
      return ecolages;
    } catch (error) {
      throw exception(error);
    }
  }
  

  async findOne(idEco: number) {
    try {
      const ecolages = await this.prismaService.ecolages.findUniqueOrThrow({
        where: {
          idEco: idEco,
        },
        include: {
          etudiants: true, // Assure-toi que la relation est bien incluse
          years_schools: true
        },
      });
      return ecolages;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idEco: number) {
    try {
      const res = await this.prismaService.ecolages.delete({
        where: {
          idEco: idEco,
        },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async count(idUser?: number): Promise<number> {
    try {
      const whereCond = idUser ? { etudiants: { idUser } } : {};
      const res = await this.prismaService.ecolages.count({ where: whereCond });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async getUnpaidNotifications(idUserStr?: string) {
    try {
      const today = new Date();
      // Si on est avant le 11 du mois, on ne notifie pas encore le retard
      if (today.getDate() <= 10) {
        return { count: 0, students: [] };
      }

      const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const currentMonth = months[today.getMonth()];

      const whereCond: any = {};
      if (idUserStr) {
        whereCond.idUser = parseInt(idUserStr, 10);
      }

      const students = await this.prismaService.etudiants.findMany({
        where: whereCond,
        include: {
          ecolages: {
            where: { mois: currentMonth }
          }
        }
      });

      const unpaidStudents = students.filter(student => {
        if (!student.ecolages || student.ecolages.length === 0) return true;
        // Vérifie si aucune écolage de ce mois n'a le statut 'Payé'
        return !student.ecolages.some(eco => eco.statut === 'Payé' || eco.statut === 'Paye');
      });

      return {
        count: unpaidStudents.length,
        month: currentMonth,
        students: unpaidStudents.map(s => ({
          idEdt: s.idEdt,
          name: s.name,
          surname: s.surname,
          tel: s.tel,
          tuteur: s.titeur,
          tel_tuteur: s.tel_titeur,
          matricule: s.matricule
        }))
      };
    } catch (error) {
      throw exception(error);
    }
  }

  async getUnpaidStudent(idEdt: number) {
    try {
      const today = new Date();
      const currentYear = today.getFullYear();
      const monthsList = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const currentMonthStr = monthsList[today.getMonth()];
      const currentMonthIndex = today.getMonth() + 1;

      const studentEcolages = await this.prismaService.ecolages.findMany({
        where: { idEdt }
      });

      const hasPaid = studentEcolages.some(eco => 
        eco.mois === currentMonthStr && (eco.statut === 'Payé' || eco.statut === 'Paye')
      );

      const unpaidMonths = [];
      if (!hasPaid) {
        let defaultAmount = studentEcolages.length > 0 ? studentEcolages[0].valeur : 0;
        
        unpaidMonths.push({
          month: currentMonthIndex,
          monthName: currentMonthStr,
          year: currentYear,
          amount: defaultAmount,
          daysLate: today.getDate() > 10 ? today.getDate() - 10 : 0,
          dueDate: `${currentYear}-${currentMonthIndex.toString().padStart(2, '0')}-10`
        });
      }

      return unpaidMonths;
    } catch (error) {
      throw exception(error);
    }
  }
}
