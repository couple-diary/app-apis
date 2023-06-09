import { Module } from '@nestjs/common';
// Controller
import { GroupController } from './group.controller';
// Repository
import { GroupRepository } from './group.repository';
import { UserRepository } from '../user/user.repository';
// Service
import { GroupService } from './group.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, UserRepository],
  exports: [GroupService]
})
export class GroupModule {}
