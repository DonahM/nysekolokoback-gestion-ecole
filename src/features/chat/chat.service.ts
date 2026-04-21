import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/features/prisma/prisma.service';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(userId: number, role: string) {
    try {
      if (role === 'SUPPER ADMIN') {
        // Super Admin sees everyone else
        return await this.prismaService.user.findMany({
          where: { idUser: { not: userId } },
          select: { idUser: true, name: true, surname: true, roles: true, logo: true, email: true }
        });
      } else {
        // Others only see Super Admins
        return await this.prismaService.user.findMany({
          where: { roles: 'SUPPER ADMIN' },
          select: { idUser: true, name: true, surname: true, roles: true, logo: true, email: true }
        });
      }
    } catch (error) {
      throw exception(error);
    }
  }

  async getMessages(user1: number, user2: number) {
    try {
      return await this.prismaService.message.findMany({
        where: {
          OR: [
            { senderId: user1, receiverId: user2 },
            { senderId: user2, receiverId: user1 }
          ]
        },
        orderBy: { idMsg: 'asc' } // Tri chronologique
      });
    } catch (error) {
      throw exception(error);
    }
  }

  async sendMessage(senderId: number, receiverId: number, content: string) {
    try {
// Format explicite de la date pour correspondre au design du projet
      const now = new Date();
      const dateString = now.toISOString(); 

      return await this.prismaService.message.create({
        data: {
          senderId,
          receiverId,
          content,
          dateEnvoi: dateString,
          isRead: false
        }
      });
    } catch (error) {
      throw exception(error);
    }
  }

  async getUnreadCount(userId: number) {
    try {
      const count = await this.prismaService.message.count({
        where: {
          receiverId: userId,
          isRead: false
        }
      });
      return { count };
    } catch (error) {
      throw exception(error);
    }
  }

  async markAsRead(user1: number, user2: number) {
    try {
      // Mark all messages as read where sender is user2 and receiver is user1
      return await this.prismaService.message.updateMany({
        where: {
          receiverId: user1,
          senderId: user2,
          isRead: false
        },
        data: {
          isRead: true
        }
      });
    } catch (error) {
       throw exception(error);
    }
  }
}
