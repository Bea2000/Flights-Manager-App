import { Injectable } from '@nestjs/common';
import {
  CreateRequestDto,
  CreateGroupRequestDto,
} from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import sequelize from '../db/config';
import { v4 as uuidv4 } from 'uuid';
import { MqttService } from 'src/mqtt/mqtt.service';
import { CreateRecommendationsDto } from './dto/create-recommendations.dto';
import axios from 'axios';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

@Injectable()
export class RequestsService {
  constructor(private mqttService: MqttService) {}
  async create(createRequestDto: CreateRequestDto) {
    const flight = await sequelize.models.Flight.findByPk(
      createRequestDto.flight_id,
    );
    if (!flight) {
      return 'Flight not found';
    }
    const user = await sequelize.models.Users.findOne({
      where: {
        sessionId: createRequestDto.session_id,
      },
    });
    if (!user) {
      return 'User not found';
    }
    const date = new Date(createRequestDto.datetime);
    const request_data = {
      userId: user.dataValues.id,
      flightId: flight.dataValues.id,
      date: date,
      // datetime: createRequestDto.datetime,
      state: 'pending',
      quantity: createRequestDto.quantity,
      request_id: uuidv4(),
    };
    if (flight.dataValues.quantity < createRequestDto.quantity) {
      return 'Not enough tickets';
    }
    const request = await sequelize.models.Request.create(request_data);
    const data = {
      request_id: request.dataValues.request_id,
      group_id: '10',
      departure_airport: flight.dataValues.departureAirportId,
      datetime: formatDate(flight.dataValues.departureDate),
      departure_time: formatDate(flight.dataValues.departureDate),
      arrival_airport: flight.dataValues.arrivalAirportId,
      deposit_token: createRequestDto.deposit_token,
      seller: 0,
      quantity: request.dataValues.quantity,
    };
    await sequelize.models.Request.update(
      {
        transaction_token: createRequestDto.deposit_token,
      },
      {
        where: {
          request_id: request.dataValues.request_id,
        },
      },
    );
    this.mqttService.publishMessage(
      `${process.env.MQTT_CHANNEL}/requests`,
      JSON.stringify(data),
    );
    return request;
  }

  async createGroup(createGroupRequestDto: CreateGroupRequestDto) {
    try {
      console.log('CreateRequestDto', createGroupRequestDto);
      // const airports = await sequelize.models.Airport.findAll();
      // console.log('AIRPORTS: ', airports);
      // const departure_time = new Date(createGroupRequestDto.departure_time);
      const departure_airport = await sequelize.models.Airport.findOne({
        where: {
          id: createGroupRequestDto.departure_airport,
        },
      });

      const arrival_airport = await sequelize.models.Airport.findOne({
        where: {
          id: createGroupRequestDto.arrival_airport,
        },
      });
      // console.log('departure_airport', departure_airport);
      // console.log('arrival_airport', arrival_airport);
      const flight = await sequelize.models.Flight.findOne({
        where: {
          departureAirportId: departure_airport.dataValues.id,
          arrivalAirportId: arrival_airport.dataValues.id,
          // departureDate: departure_time,
        },
      });
      // console.log('flight', flight);
      if (!flight) {
        return 'Flight not found';
      }

      let groupUser = await sequelize.models.Users.findOne({
        where: {
          sessionId: '000000000000000000' + createGroupRequestDto.group_id,
        },
      });

      if (!groupUser) {
        groupUser = await sequelize.models.Users.create({
          email: createGroupRequestDto.group_id + '@group.com',
          username: createGroupRequestDto.group_id,
          sessionId: '000000000000000000' + createGroupRequestDto.group_id,
        });
      }

      const request_data = {
        userId: groupUser.dataValues.id,
        flightId: flight.dataValues.id,
        date: createGroupRequestDto.datetime,
        state: 'pending',
        quantity: createGroupRequestDto.quantity,
        request_id: createGroupRequestDto.request_id,
      };
      if (flight.dataValues.quantity < createGroupRequestDto.quantity) {
        return 'Not enough tickets';
      }
      const request = await sequelize.models.Request.create(request_data);
      console.log('request', request);
      return request;
    } catch (err) {
      console.log('Error', err);
      return err;
    }
  }
  findAll() {
    return sequelize.models.Request.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    console.log('updateRequestDto', updateRequestDto);
    return `This action updates a #${id} request`;
  }
  async update_state(updateRequestDto: UpdateRequestDto) {
    console.log('updateRequestDto', updateRequestDto);
    const request = await sequelize.models.Request.findOne({
      where: {
        request_id: updateRequestDto.request_id,
      },
    });
    if (!request) {
      return 'Request not found';
    }
    request.update({
      state: updateRequestDto.state,
    });
    if (updateRequestDto.state === 'approved') {
      const flight = await sequelize.models.Flight.findOne({
        where: {
          id: request.dataValues.flightId,
        },
      });
      if (!flight) {
        return 'Flight not found';
      }
      flight.update({
        quantity: flight.dataValues.quantity - request.dataValues.quantity,
      });
      await sequelize.models.Tickets.create({
        userId: request.dataValues.userId,
        flightId: request.dataValues.flightId,
        quantity: request.dataValues.quantity,
      });
      // console.log('ticket', ticket);
    }
    console.log('Ticket updates successfully');
    return request;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }

  async createRecommendations(
    createRecommendationsDto: CreateRecommendationsDto,
    id: string,
  ) {
    try {
      const { flights, ip_coord } = createRecommendationsDto;
      const work = await axios.post('http://producer:8000/job', {
        flights,
        ip_coord,
      });
      await sequelize.models.Users.update(
        {
          recommendationsId: work.data.job_id,
          recommendationsDate: work.data.date,
        },
        {
          where: {
            sessionId: id,
          },
        },
      );

      return work.data;
    } catch (err) {
      console.log('Error', err);
      return err;
    }
  }

  async getRecommendationsStatus() {
    try {
      const status = await axios.get('http://producer:8000/heartbeat');
      return status.data;
    } catch (err) {
      console.error('Error connecting to server:', err.message);
      console.error('Full error:', err);
      return false;
    }
  }

  async getRecommendationStatus(id: string) {
    try {
      const job = await axios.get(`http://producer:8000/job/${id}`);
      if (job.data.result != null) {
        return job.data;
      } else {
        return {
          ready: 'pending',
          result: [],
        };
      }
    } catch (err) {
      console.log('Error', err);
      return err;
    }
  }

  async getIp() {
    try {
      const ip = await axios.get('http://ip-api.com/json');
      return ip.data;
    } catch (err) {
      console.log('Error', err);
      return err;
    }
  }
}
