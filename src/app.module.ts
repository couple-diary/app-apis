import { Module } from '@nestjs/common';
// Modules
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [AuthModule, UserModule]
})
export class AppModule {}
