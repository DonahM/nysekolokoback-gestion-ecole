import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    
    @IsNotEmpty()
    @ApiProperty()
    actualPassword: string;
  
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string;
}