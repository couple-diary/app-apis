import { Module } from '@nestjs/common';
// Controller
import { AuthController } from './auth.controller';
// Module
import { UserModule } from '../user/user.module';
// Service
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
