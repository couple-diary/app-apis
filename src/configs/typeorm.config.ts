import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '',
  port: 5432,
  username: '',
  password: '',
  database: '',
  entities: [],
  synchronize: true
}