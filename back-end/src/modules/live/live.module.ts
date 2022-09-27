import { Module } from '@nestjs/common';
import { LiveService } from './services/live.service';
import { LiveController } from './controllers/live.controller';

@Module({
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
