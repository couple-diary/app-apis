import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string | undefined>('DB_HOST'),
      port: this.configService.get<number | undefined>('DB_PORT'),
      username: this.configService.get<string | undefined>('DB_USERNAME'),
      password: this.configService.get<string | undefined>('DB_PASSWORD'),
      database: this.configService.get<string | undefined>('DB_DATABASE'),
      entities: [],
      synchronize: true
    };
  }
}