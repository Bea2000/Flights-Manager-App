import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from './db/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  //   {
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // });
  await app.listen(process.env.API_PORT || 3000);

  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    console.log(
      'API is running on: http://localhost:' + (process.env.API_PORT || 3000),
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

bootstrap();
