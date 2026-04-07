import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  @ApiProperty()
  userName: string;

  @IsString()
  @ApiProperty()
  dbName: string;

  @IsBoolean()
  @ApiProperty()
  isUpdate: boolean;
}
