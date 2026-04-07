import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { etudiants } from '@prisma/client';
import { join } from 'path';
import { PrismaService } from 'src/features/prisma/prisma.service';
import * as fs from 'fs';
import * as argon2 from 'argon2';
import { CreateEtudiantsDto } from './dto/create-etudiants.dto';
import exception from 'src/core/errors/error_handler';
import { UpdateEtudiantsDto } from './dto/update-etudiants.dto';

@Injectable()
export class EtudiantsService {
    constructor(
        private prismaService: PrismaService,
        // private tagHasBddService: TagHasBddService,
      ) {}

      async fetchDatabases(
        enablePagination: boolean,
        page: number,
        itemsPerPage?: number,
        idUser?: number
      ): Promise<etudiants[] | null> {
        const whereClause = idUser ? { idUser } : {};
        if (!enablePagination) {
          return this.prismaService.etudiants.findMany({
            where: whereClause,
            include: {
              classE: true,
            },
          });
        }
        return this.prismaService.etudiants.findMany({
          where: whereClause,
          skip: (page - 1) * (itemsPerPage ?? 10),
          take: itemsPerPage ?? 10,
          include: {
            classE: true,
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
        dto: CreateEtudiantsDto,
      ): Promise<etudiants | HttpException> {
        try {
          const hashedPassword = await argon2.hash(dto.password);
          console.log("test5: ", dto.idUser)
          const db = await this.prismaService.etudiants.create({
            data: {
              name: dto.name,
              surname: dto.surname,
              date_naiss: dto.date_naiss,
              lieu_naiss: dto.lieu_naiss,
              sexe: dto.sexe,
              tel: dto.tel,
              adress_edt: dto.adress_edt,
              matricule: dto.matricule,
              father: dto.father,
              jobs_f : dto.jobs_f,
              mother : dto.mother,
              jobs_m : dto.jobs_m,
              tel_parent: dto.tel_parent,
              adresse_parent: dto.adresse_parent,
              titeur : dto.titeur,
              tel_titeur: dto.tel_titeur,
              adress_titeur: dto.adress_titeur,
              ecole_anter : dto.ecole_anter ,
              image: dto.image,
              password: hashedPassword,
              user: {
                connect: {
                  idUser: dto.idUser
                }
              },
              // classE: {
              //   connect: {
              //     idCls: dto.idCls
              //   }
              // },
              // years_schools: {
              //   connect: {
              //     idSchool: dto.idSchool
              //   }
              // }
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
          const etudiants = await this.prismaService.etudiants.findMany(
            {
              where: whereClause,
              include:{
                ecolages:true,
                // matieres: true,
                years_schools:true,
                classE: true,
                notes: true,
              },
            }
          );
          return etudiants;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findByEtudiants(idEdt: number): Promise<etudiants[]> {
        try {
          const etudiants = await this.prismaService.etudiants.findMany({
            where: {
              idEdt: {
                equals: idEdt,
              },
              
            },
            include: {
              classE: true,
            },
          });
          return etudiants;
        } catch (error) {
          throw exception(error);
        }
      }
      
      async findByMatricule(idEdt: number): Promise<etudiants[]> {
        try {
          const etudiants = await this.prismaService.etudiants.findMany({
            where: {
              idEdt: {
                equals: idEdt,
              },
            },
            include: {
              classE: true,
              years_schools: true
            }
          });
          return etudiants;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findOne(idEdt: number) {
        try {
          const etudiants = await this.prismaService.etudiants.findUniqueOrThrow({
            where: {
              idEdt: idEdt,
            },
            include: {
              classE: {
                include: {
                  classE: true
                }
              },
              years_schools: {
                include: {
                  years_schools: true
                }
              },
              ecolages: {
                include: {
                  years_schools: true
                }
              },
              // notes: true // Assure-toi que la relation est bien incluse
            },
          });
          return etudiants;
        } catch (error) {
          throw exception(error);
        }
      }

      async update(
        idEdt: number,
        updateEtudiantsDto: UpdateEtudiantsDto,
        image?: string,
      ): Promise<etudiants | HttpException> {
        try {
          const updatedEtudiants = await this.prismaService.etudiants.update({
            where: {
              idEdt: idEdt,
            },
            data: {
              name: updateEtudiantsDto.name,
              surname: updateEtudiantsDto.surname,
              date_naiss: updateEtudiantsDto.date_naiss,
              lieu_naiss: updateEtudiantsDto.lieu_naiss,
              sexe: updateEtudiantsDto.sexe,
              tel: updateEtudiantsDto.tel,
              adress_edt: updateEtudiantsDto.adress_edt,
              matricule: updateEtudiantsDto.matricule,
              father: updateEtudiantsDto.father,
              jobs_f : updateEtudiantsDto.jobs_f,
              mother : updateEtudiantsDto.mother,
              jobs_m : updateEtudiantsDto.jobs_m,
              tel_parent: updateEtudiantsDto.tel_parent,
              adresse_parent: updateEtudiantsDto.adresse_parent,
              titeur : updateEtudiantsDto.titeur,
              tel_titeur: updateEtudiantsDto.tel_titeur,
              adress_titeur: updateEtudiantsDto.adress_titeur,
              ecole_anter : updateEtudiantsDto.ecole_anter ,
              image: updateEtudiantsDto.image,
              password: updateEtudiantsDto.password
            },
          });
          return updatedEtudiants;
        } catch (error) {
          throw exception(error);
        }
      }

      async remove(idEdt: number): Promise<etudiants | unknown> {
        try {
          const res = await this.prismaService.etudiants.delete({
            where: {
              idEdt: idEdt,
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
          const res = await this.prismaService.etudiants.count({ where: whereClause });
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
    

}
