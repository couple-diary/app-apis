import { Module } from '@nestjs/common';
// Controller
import { AuthController } from './auth.controller';
// Service
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
