import { Module } from '@nestjs/common';
import { EcolagesController } from './ecolages.controller';
import { EcolagesService } from './ecolages.service';

@Module({
    controllers: [EcolagesController],
    providers: [EcolagesService],
})
export class EcolagesModule {}
