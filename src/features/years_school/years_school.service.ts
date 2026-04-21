import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { years_schools} from '@prisma/client';
import { join } from 'path';
import { PrismaService } from 'src/features/prisma/prisma.service';
import * as fs from 'fs';
import { CreateYearsSchoolDto  } from './dto/create-years-school.dto';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class YearsSchoolService {
    constructor(
        private prismaService: PrismaService,
      ) {}

      async fetchDatabases(
        enablePagination: boolean,
        page: number,
        itemsPerPage?: number,
        idUserStr?: string,
      ): Promise<years_schools[] | null> {
        const whereCond = idUserStr ? { idUser: parseInt(idUserStr, 10) } : {};
        if (!enablePagination) {
          return this.prismaService.years_schools.findMany({
            where: whereCond,
            include: {
              etudiants:true,
              matieres: true,
              notes: true,
              ecolages: true,
              professeurs: true,
              salaires: true,
              classE: {
                include: {
                  etudiants: true
                }
              }
            },
          });
        }
        return this.prismaService.years_schools.findMany({
          where: whereCond,
          skip: (page - 1) * (itemsPerPage ?? 10),
          take: itemsPerPage ?? 10,
          include: {
              etudiants:true,
              matieres: true,
              notes: true,
              ecolages: true,
              professeurs: true,
              salaires: true,
              classE: {
                include: {
                  etudiants: true
                }
              }
          },
        });
      }

      async serveFiles(dir: string): Promise<string[] | null> {
        const directoryPath = join(
          __dirname,
          '..',
          '..',
          '..',
          'public',
          'upload',
          dir,
        );
    
        if (
          !fs.existsSync(directoryPath) ||
          !fs.lstatSync(directoryPath).isDirectory()
        ) {
          return null;
        }
        const files = fs.readdirSync(directoryPath);
        return files;
      }
    
      async create(
        dto: CreateYearsSchoolDto,
      ): Promise<years_schools | HttpException> {
        try {
          const existing = await this.prismaService.years_schools.findFirst({
            where: {
              annee_scolaire: dto.annee_scolaire,
              idUser: dto.idUser
            }
          });

          if (existing) {
            throw new HttpException('Cette année scolaire existe déjà.', 400);
          }

          const db = await this.prismaService.years_schools.create({
            data: {
              annee_scolaire: dto.annee_scolaire,
              idUser: dto.idUser
            },
          });
          return db;
        } catch (error) {
          if (error instanceof HttpException) throw error;
          throw exception(error);
        }
      }


      // async create(dto: CreateYearsSchoolDto): Promise<years_schools | HttpException> {
      //   console.log('Données reçues dans le service:', dto);
      
      //   if (!dto.annee_scolaire) {
      //     throw new HttpException('annee_scolaire est requis', 400);
      //   }
      
      //   try {
      //     const years_schools = await this.prismaService.years_schools.create({
      //       data: {
      //         annee_scolaire: dto.annee_scolaire,
      //       },
      //     });
      //     return years_schools;
      //   } catch (error) {
      //     console.error('Erreur Prisma:', error);
      //     throw new HttpException('Erreur lors de la création', 500);
      //   }
      // }
      

      async findAll(idUserStr?: string) {
        try {
          const whereCond = idUserStr ? { idUser: parseInt(idUserStr, 10) } : {};
          const years_schools = await this.prismaService.years_schools.findMany(
            {
              where: whereCond
            }
          );
          return years_schools;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findByYears_school(idSchool: number): Promise<years_schools[]> {
        try {
          const years_schools = await this.prismaService.years_schools.findMany({
            where: {
              idSchool: {
                equals: idSchool,
              },
            },
            include: {
              matieres: true,
            },
          });
          return years_schools;
        } catch (error) {
          throw exception(error);
        }
      }
    
    
      async findOne(idSchool: number) {
        try {
          const years_schools = await this.prismaService.years_schools.findUniqueOrThrow({
            where: {
              idSchool: idSchool,
            },
            include: {
              matieres: true,
            },
          });
          return years_schools;
        } catch (error) {
          throw exception(error);
        }
      }

    //   async update(
    //     idSchool: number,
    //     updateEtudiantsDto: UpdateEtudiantsDto,
    //     image?: string,
    //   ): Promise<etudiants | HttpException> {
    //     try {
    //       const updatedEtudiants = await this.prismaService.etudiants.update({
    //         where: {
    //           idSchool: idSchool,
    //         },
    //         data: {
    //           name: updateEtudiantsDto.name,
    //           surname: updateEtudiantsDto.surname,
    //           date_naiss: updateEtudiantsDto.date_naiss,
    //           lieu_naiss: updateEtudiantsDto.lieu_naiss,
    //           sexe: updateEtudiantsDto.sexe,
    //           tel: updateEtudiantsDto.tel,
    //           adress_edt: updateEtudiantsDto.adress_edt,
    //           father: updateEtudiantsDto.father,
    //         },
    //       });
    //       return updatedEtudiants;
    //     } catch (error) {
    //       throw exception(error);
    //     }
    //   }

      async remove(idSchool: number): Promise<years_schools | unknown> {
        try {
          const res = await this.prismaService.years_schools.delete({
            where: {
              idSchool: idSchool,
            },
          });
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async count(idUserStr?: string): Promise<number> {
        try {
          const whereCond = idUserStr ? { idUser: parseInt(idUserStr, 10) } : {};
          const res = await this.prismaService.years_schools.count({ where: whereCond });
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
}
