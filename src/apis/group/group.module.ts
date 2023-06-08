import { Module } from '@nestjs/common';
// Controller
import { GroupController } from './group.controller';
// Module
import { UserModule } from '../user/user.module';
// Service
import { GroupService } from './group.service';

@Module({
  imports: [UserModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService]
})
export class GroupModule {}
