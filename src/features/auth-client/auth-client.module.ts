import { Module } from '@nestjs/common';
import { AuthClientController } from './auth-client.controller';
import { AuthClientService } from './auth-client.service';

@Module({
    controllers: [AuthClientController],
    providers: [AuthClientService],
})
export class AuthClientModule {}
