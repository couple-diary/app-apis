import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// API Module
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';
// Configuration
import { envOptions } from './configs/env.config';
// TypeORM Configuration
import { MongoConfigProvider, PostgresConfigProvider } from './configs/typeorm.config';
import { GroupModule } from './apis/group/group.module';
import { EventModule } from './apis/event/event.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(envOptions),
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigProvider }),
    TypeOrmModule.forRootAsync({ useClass: MongoConfigProvider }),
    GroupModule,
    EventModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}