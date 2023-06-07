import { Module } from '@nestjs/common';
// Module
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';
// Service
import { EventService } from './event.service';

@Module({
  imports: [GroupModule, UserModule],
  providers: [EventService]
})
export class EventModule {}
