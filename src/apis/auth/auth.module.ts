import { Module } from '@nestjs/common';
// Controller
import { AuthController } from './auth.controller';
// JWT
import { JwtModule } from '@nestjs/jwt';
// Module
import { UserModule } from '../user/user.module';
// Service
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({ global: true })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
