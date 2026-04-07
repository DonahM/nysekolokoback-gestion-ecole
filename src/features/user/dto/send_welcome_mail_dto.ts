import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SendWelcomeMailDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
    @IsEmail()
    @ApiProperty()
    email: string;
}