import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmFactory = (service: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: service.get<string | undefined>('DB_HOST'),
  port: service.get<number | undefined>('DB_PORT'),
  username: service.get<string | undefined>('DB_USERNAME'),
  password: service.get<string | undefined>('DB_PASSWORD'),
  database: service.get<string | undefined>('DB_DATABASE'),
  entities: [],
  synchronize: true
})