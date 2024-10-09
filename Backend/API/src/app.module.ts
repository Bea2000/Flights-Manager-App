import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthzModule } from './authz/authz.module';
import { UsersModule } from './users/users.module';
import { FlightsModule } from './flights/flights.module';
import { RequestsModule } from './requests/requests.module';
import { TicketsModule } from './tickets/tickets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { EmailModule } from './email/email.module';
import sequelize from './db/config';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelize.options),
    UsersModule,
    AuthzModule,
    FlightsModule,
    ConfigModule.forRoot(),
    RequestsModule,
    TicketsModule,
    TransactionsModule,
    EmailModule,
  ],
})
export class AppModule {}
