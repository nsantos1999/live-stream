import { Module } from '@nestjs/common';
import { LiveModule } from './modules/live/live.module';

@Module({
  imports: [LiveModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
