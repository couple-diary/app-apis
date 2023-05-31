import { Module } from '@nestjs/common';
// Modules
import { AuthModule } from './apis/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apis/user/user.module';
// TypeORM
import { DatabaseOptionsFactory } from './configs/typeorm.config';
import { GroupModule } from './apis/group/group.module';

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
    GroupModule,
  ]
})
export class AppModule {}