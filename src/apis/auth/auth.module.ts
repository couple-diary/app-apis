import { Module } from '@nestjs/common';
// Controller
import { AuthController } from './auth.controller';
// JWT
import { JwtModule } from '@nestjs/jwt';
// Module
import { PassportModule } from '@nestjs/passport';
// Repository
import { UserRepository } from '../user/user.repository';
// Service
import { AuthService } from './auth.service';
// Strategy
import { JwtStrategy, SlientRefreshStrategy } from './auth.strategy';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SlientRefreshStrategy, UserRepository],
  exports: [AuthService]
})
export class AuthModule {}
