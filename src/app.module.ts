import { Module } from '@nestjs/common';
import { CommsService } from './comms/comms.service';
import { CommsController } from './comms/comms.controller';
import { UserDatabaseService } from './data/userData.service';

@Module({
  imports: [],
  controllers: [CommsController],
  providers: [CommsService, UserDatabaseService],
})
export class AppModule {}
