const dotenv = require('dotenv');
dotenv.config();

const development = {
  username: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASSWORD || null,
  database: process.env.DATABASE_NAME || '',
  host: process.env.DATABASE_HOST || '',
  dialect: 'postgres',
};

const test = {
  username: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASSWORD || null,
  database: process.env.DATABASE_NAME + '_test' || '',
  host: process.env.DATABASE_HOST || '',
  dialect: 'postgres',
};

const production = {
  username: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASSWORD || null,
  database: process.env.DATABASE_NAME + '_prod' || '',
  host: process.env.DATABASE_HOST || '',
  dialect: 'postgres',
};

module.exports = { development, test, production };
