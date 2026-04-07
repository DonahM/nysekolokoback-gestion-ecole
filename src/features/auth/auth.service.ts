import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/features/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  private user: any;

  setUser(userData: any) {
    this.user = userData;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.user; // Retourne true si un utilisateur est défini
  }

  async login(dto: AuthDto): Promise<{ success: boolean; data: Partial<user> }> {
    const user = await this.prismaService.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException({ message: `user doesn't exist` }, 403);
    }

    const validPassword = await argon2.verify(user.password, dto.password);
    if (!validPassword) {
      throw new HttpException({ message: 'password not valid' }, 402);
    }

    if (!user.isActive && user.roles.indexOf('SUPPER ADMIN') === -1) {
      throw new HttpException({ message: 'Votre compte a été désactivé par un Super Administrateur.' }, 403);
    }

    const { password, ...userWithoutPassword } = user;
    return { success: true, data: userWithoutPassword };
  }
}
