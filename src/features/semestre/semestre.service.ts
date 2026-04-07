import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { semestre } from '@prisma/client';
import { join } from 'path';
import { PrismaService } from 'src/features/prisma/prisma.service';
import * as fs from 'fs';
import { CreatesemestreDto  } from './dto/create-semestre.dto';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class SemestreService {
    constructor(
        private prismaService: PrismaService,
        // private tagHasBddService: TagHasBddService,
      ) {}

      async fetchDatabases(
        enablePagination: boolean,
        page: number,
        itemsPerPage?: number,
        idUser?: number
      ): Promise<semestre[] | null> {
        const whereClause = idUser ? { idUser } : {};
        if (!enablePagination) {
          return this.prismaService.semestre.findMany({
            where: whereClause,
            include: {
                years_schools:true
            },
          });
        }
        return this.prismaService.semestre.findMany({
          where: whereClause,
          skip: (page - 1) * (itemsPerPage ?? 10),
          take: itemsPerPage ?? 10,
          include: {
            years_schools:true
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
        dto: CreatesemestreDto,
      ): Promise<semestre | HttpException> {
        try {
          const db = await this.prismaService.semestre.create({
            data: {
              name: dto.name,
              idSchool: dto.idSchool,
              idUser: dto.idUser
            },
          });
          return db;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findAll(idUser?: number) {
        try {
          const whereClause = idUser ? { idUser } : {};
          const semestre = await this.prismaService.semestre.findMany(
            {
              where: whereClause,
            }
          );
          return semestre;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findByEtudiants(idSchool: number): Promise<semestre[]> {
        try {
          const semestre = await this.prismaService.semestre.findMany({
            where: {
              idSchool: {
                equals: idSchool,
              },
            },
            include: {
                years_schools: true,
            },
          });
          return semestre;
        } catch (error) {
          throw exception(error);
        }
      }
    
    
      async findOne(idSem: number) {
        try {
          const semestre = await this.prismaService.semestre.findUniqueOrThrow({
            where: {
              idSem: idSem,
            },
            include: {
                years_schools: true, // Assure-toi que la relation est bien incluse
            },
          });
          return semestre;
        } catch (error) {
          throw exception(error);
        }
      }

    //   async update(
    //     idSem: number,
    //     updateEtudiantsDto: UpdateEtudiantsDto,
    //     image?: string,
    //   ): Promise<etudiants | HttpException> {
    //     try {
    //       const updatedEtudiants = await this.prismaService.etudiants.update({
    //         where: {
    //           idSem: idSem,
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

      async remove(idSem: number): Promise<semestre | unknown> {
        try {
          const res = await this.prismaService.semestre.delete({
            where: {
              idSem: idSem,
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
          const res = await this.prismaService.semestre.count({ where: whereClause });
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
}
