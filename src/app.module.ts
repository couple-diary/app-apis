import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// API Module
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';
// Configuration
import { envOptions } from './configs/env.config';
// TypeORM Configuration
import { TypeOrmConfigProvider } from './configs/typeorm.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(envOptions),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigProvider })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
