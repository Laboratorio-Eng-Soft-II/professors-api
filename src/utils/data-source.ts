require('dotenv').config()
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Professor } from "../entities/Professor"
import config from 'config';

const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('postgresConfig');

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Professor],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

