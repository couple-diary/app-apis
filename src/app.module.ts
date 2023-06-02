import { Module } from '@nestjs/common';
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
