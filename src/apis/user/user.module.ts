import { Module } from '@nestjs/common';
// Controller
import { UserController } from './user.controller';
// Service
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
