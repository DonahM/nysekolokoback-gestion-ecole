import { Module } from '@nestjs/common';
import { RevenusController } from './revenus.controller';
import { RevenusService } from './revenus.service';

@Module({
  controllers: [RevenusController],
  providers: [RevenusService]
})
export class RevenusModule {}
