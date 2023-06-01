import { Module } from '@nestjs/common';
// Controller
import { AuthController } from './auth.controller';
// Module
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
// Service
import { AuthService } from './auth.service';
// Strategy
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'CoupleDiary01',
      signOptions: { expiresIn: 3600 }
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
