import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthClientDto } from '../auth-client/dto/create-client.dto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  findOne(arg0: { where: { idMat: number; idSem: number; idEdt: number; }; }) {
    throw new Error('Method not implemented.');
  }
  login(dto: AuthClientDto): { success: boolean; data: Partial<import(".prisma/client").etudiants>; } | PromiseLike<{ success: boolean; data: Partial<import(".prisma/client").etudiants>; }> {
    throw new Error('Method not implemented.');
  }
  users: any;
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}