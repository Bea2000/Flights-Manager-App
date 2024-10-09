import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt'; // Updated import statement for consistency

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient; // Updated the type to be more specific

  constructor() {
    // Connect to MQTT broker
    this.client = mqtt.connect({
      host: process.env.MQTT_HOST,
      port: parseInt(process.env.MQTT_PORT),
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      keepalive: 60000,
    });

    // Successful connection
    this.client.on('connect', () => {
      //   console.log('Connected to MQTT broker');
      //   this.client.subscribe('nest/data', (err) => {
      //     if (!err) {
      //       console.log('Subscribed to topic: nest/data');
      //     } else {
      //       console.error('Failed to subscribe:', err);
      //     }
      //   });
    });

    // Handle incoming messages
    this.client.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}:`, message.toString());
      // You can process the received message here
    });

    // Handle errors
    this.client.on('error', (error) => {
      console.error('Connection error:', error);
    });
  }

  // Publish message to MQTT broker
  public publishMessage(
    topic: string = 'flights/requests',
    message: string,
  ): void {
    this.client.publish(topic, message, {}, (err) => {
      if (err) {
        console.error('Failed to publish message:', err);
      } else {
        console.log(`Message published to topic ${topic}`);
      }
    });
  }
}
