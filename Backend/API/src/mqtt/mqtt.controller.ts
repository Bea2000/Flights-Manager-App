import { Controller, Get } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('nest')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('publish')
  async publishMessage() {
    // Publish a sample message
    // this.mqttService.publishMessage('Hello, MQTT!');
    return 'Message published';
  }
}
