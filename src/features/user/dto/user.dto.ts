import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  surname: string;

  @IsString()
  @ApiProperty()
  cin: string;

  @IsString()
  @ApiProperty()
  logo: string;

  @IsString()
  @ApiProperty()
  lieu: string;
  
  @IsArray()
  @ApiProperty({ type: String, isArray: true })
  roles: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  drene?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  cisco?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  zap?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  code?: string;
}
