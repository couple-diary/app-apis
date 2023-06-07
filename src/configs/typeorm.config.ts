import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
// Entity
import { Auth } from 'src/apis/auth/auth.entity';
import { User } from 'src/apis/user/user.entity';
// Type
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigProvider implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRE_DB_HOST'),
      port: this.configService.get<number>('POSTGRE_DB_PORT', 5432),
      username: this.configService.get<string>('POSTGRE_DB_USERNAME'),
      password: this.configService.get<string>('POSTGRE_DB_PASSWORD'),
      database: this.configService.get<string>('POSTGRE_DB_DATABASE'),
      entities: [User],
      synchronize: true
    };
  }
}

@Injectable()
export class MongoConfigProvider implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mongodb',
      host: this.configService.get<string>('MONGO_DB_HOST'),
      port: this.configService.get<number>('MONGO_DB_PORT', 27017),
      username: this.configService.get<string>('MONGO_DB_USERNAME'),
      password: this.configService.get<string>('MONGO_DB_PASSWORD'),
      database: this.configService.get<string>('MONGO_DB_DATABASE'),
      entities: [Auth],
      synchronize: true
    };
  }
}