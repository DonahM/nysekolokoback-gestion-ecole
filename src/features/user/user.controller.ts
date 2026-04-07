import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Patch, Post, UseInterceptors, BadRequestException, UploadedFile, Headers } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResetPasswordDto } from './dto/reset_password_dto';
import { ResendPasswordDto } from './dto/resend_password_dto';
import UploadFileUsecase from 'src/core/usecases/upload_file_usecase';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<User, Key>;
  }

  @Post()
  async create(@Body() dto: UserDto, @Headers('x-user-id') idUserStr?: string) {
    if (idUserStr) {
      const reqUser = await this.service.findOne(parseInt(idUserStr, 10));
      if (!reqUser || reqUser.roles.indexOf('SUPPER ADMIN') === -1) {
        throw new HttpException('Unauthorized: Only Super Admin can manage users', 403);
      }
    }
    try {
      const newUser = await this.service.createUser(dto);
      return newUser;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', 400);
    }
    const filename = UploadFileUsecase('users', file);
    return { filePath: filename };
  }
  @Get()
  async findAll(@Headers('x-user-id') idUserStr?: string) {
    if (idUserStr) {
      const reqUser = await this.service.findOne(parseInt(idUserStr, 10));
      if (!reqUser || reqUser.roles.indexOf('SUPPER ADMIN') === -1) {
        throw new HttpException('Unauthorized: Only Super Admin can view all users', 403);
      }
    }
    try {
      const users = await this.service.findAll();
      return users;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') idUser: number) {
    try {
      const user = await this.service.findOne(idUser);
      return user;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Patch(':id/toggle-status')
  async toggleStatus(
    @Param('id') idUser: number,
    @Headers('x-user-id') idUserStr?: string
  ) {
    if (idUserStr) {
      const reqUser = await this.service.findOne(parseInt(idUserStr, 10));
      if (!reqUser || reqUser.roles.indexOf('SUPPER ADMIN') === -1) {
        throw new HttpException('Unauthorized: Only Super Admin can toggle user statuses', 403);
      }
    }
    try {
      const updatedUser = await this.service.toggleStatus(idUser);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Patch(':id/reset-password')
  async resetPassword(
    @Param('id') idUser: number,
    @Body() dto: ResetPasswordDto,
  ) {
    try {
      const updatedUser = await this.service.resetPassword(idUser, dto);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') idUser: number,
    @Body() dto: UserDto,
    @Headers('x-user-id') requestingUserIdStr?: string
  ) {
    if (requestingUserIdStr) {
      const reqUser = await this.service.findOne(parseInt(requestingUserIdStr, 10));
      if (!reqUser || reqUser.roles.indexOf('SUPPER ADMIN') === -1) {
        throw new HttpException('Unauthorized: Only Super Admin can update users', 403);
      }
    }
    try {
      const updatedUser = await this.service.update(idUser, dto);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Post('resend-password')
  async resendPassword(@Body() dto: ResendPasswordDto) {
    try {
      const randomPassword = await this.service.resendPassword(dto);
      return { password: randomPassword };
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }
}
