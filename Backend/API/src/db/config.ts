import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  dialect: 'postgres',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  models: [__dirname + '/models'],
});

export default sequelize;
