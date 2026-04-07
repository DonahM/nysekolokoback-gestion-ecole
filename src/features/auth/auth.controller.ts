import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { user } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() dto: AuthDto): Promise<{ success: boolean; data: Partial<user> }> {
    return await this.authService.login(dto);
  }
  
}
