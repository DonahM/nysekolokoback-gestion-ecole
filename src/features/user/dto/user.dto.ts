import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator';

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
}
