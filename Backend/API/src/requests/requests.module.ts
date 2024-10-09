import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { FlightsModule } from '../flights/flights.module';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [FlightsModule, MqttModule],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
