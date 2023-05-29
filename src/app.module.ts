import { Module } from '@nestjs/common';
// Modules
import { AuthModule } from './apis/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apis/user/user.module';
// TypeORM
import { DatabaseOptionsFactory } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DatabaseOptionsFactory,
    }),
    AuthModule,
    UserModule,
  ]
})
export class AppModule {}