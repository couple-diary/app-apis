import { Module } from '@nestjs/common';
// Controller
import { UserController } from './user.controller';
// Repository
import { UserRepository } from './user.repository';
// Service
import { GroupRepository } from '../group/group.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [GroupRepository, UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
