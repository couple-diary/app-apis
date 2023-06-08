import { Module } from '@nestjs/common';
// Controller
import { AuthController } from './auth.controller';
// JWT
import { JwtModule } from '@nestjs/jwt';
// Module
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
// Service
import { AuthService } from './auth.service';
// Strategy
import { JwtStrategy, SlientRefreshStrategy } from './auth.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({ global: true }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SlientRefreshStrategy],
  exports: [AuthService]
})
export class AuthModule {}
