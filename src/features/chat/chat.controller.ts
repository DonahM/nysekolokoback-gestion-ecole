import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('users')
  getUsers(@Query('userId') userId: string, @Query('role') role: string) {
    return this.chatService.getUsers(+userId, role);
  }

  @Get('messages')
  getMessages(@Query('user1') user1: string, @Query('user2') user2: string) {
    return this.chatService.getMessages(+user1, +user2);
  }

  @Post('send')
  sendMessage(@Body() data: { senderId: number; receiverId: number; content: string }) {
    return this.chatService.sendMessage(data.senderId, data.receiverId, data.content);
  }

  @Get('unread-count')
  getUnreadCount(@Query('userId') userId: string) {
    return this.chatService.getUnreadCount(+userId);
  }

  @Post('mark-read')
  markAsRead(@Body() data: { currentUserId: number; otherUserId: number }) {
    return this.chatService.markAsRead(data.currentUserId, data.otherUserId);
  }
}
