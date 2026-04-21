import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { user } from '@prisma/client';
import * as argon2 from 'argon2';
import exception from 'src/core/errors/error_handler';
import { ResetPasswordDto } from './dto/reset_password_dto';
import { ResendPasswordDto } from './dto/resend_password_dto';
import { generateRandomPassword } from 'src/core/helpers/random_password';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async createUser(dto: UserDto): Promise<user> {
    try {
      const existingUser = await this.getUserByEmail(dto.email);

      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await argon2.hash(dto.password);
      const rolesAsString = dto.roles.join(', ');

      const newUser = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          surname: dto.surname,
          cin: dto.cin,
          roles: rolesAsString,
          logo: dto.logo,
          lieu: dto.lieu,
          password: hashedPassword,
          drene: dto.drene,
          cisco: dto.cisco,
          zap: dto.zap,
          code: dto.code,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(idUser: number): Promise<user | null> {
    const user = await this.prismaService.user.findUnique({
      where: { idUser },
      include: { 
        etudiants: true,
        classE: true
       }, 
    });

    if (!user) {
      throw new BadRequestException(`User with ID ${idUser} not found.`);
    }

    return user;
  }

  async findAll(): Promise<user[]> {
    try {
      const users = await this.prismaService.user.findMany({
        include: {
          etudiants: true,
          classE: true 
        },
      });

      if (users.length === 0) {
        throw new HttpException('Aucun utilisateur trouvé', HttpStatus.NOT_FOUND);
      }

      return users;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async toggleStatus(idUser: number) {
    const user = await this.prismaService.user.findUnique({
      where: { idUser },
    });
    if (!user) throw new BadRequestException('User does not exist');
    
    return this.prismaService.user.update({
      where: { idUser },
      data: { isActive: !user.isActive },
    });
  }

  // Méthode pour réinitialiser le mot de passe
  async resetPassword(idUser: number, dto: ResetPasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: { idUser },
    });

    if (!user) throw new BadRequestException('User does not exist');

    const validPassword = await argon2.verify(user.password, dto.actualPassword);
    if (!validPassword) throw new BadRequestException('Password does not match the actual password');

    const hashedPassword = await argon2.hash(dto.newPassword);

    return this.prismaService.user.update({
      where: { idUser },
      data: { password: hashedPassword },
    });
  }

  // Méthode pour renvoyer un mot de passe généré
  async resendPassword(dto: ResendPasswordDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) throw new BadRequestException('User does not exist');

    const randomPasswd = generateRandomPassword();
    const hashedPassword = await argon2.hash(randomPasswd);

    await this.prismaService.user.update({
      where: { idUser: user.idUser },
      data: { password: hashedPassword },
    });

    return randomPasswd;
  }

  // Méthode pour mettre à jour un utilisateur
  async update(idUser: number, dto: UserDto) {
    try {
      const data: any = {};
      if (dto.email != null) data.email = dto.email;
      if (dto.name != null) data.name = dto.name;
      if (dto.surname != null) data.surname = dto.surname;
      if (dto.roles != null) data.roles = dto.roles.join(', ');

      return this.prismaService.user.update({
        where: { idUser },
        data,
      });
    } catch (error) {
      throw exception(error);
    }
  }

  private async getUserByEmail(email: string): Promise<user | null> {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }
}
