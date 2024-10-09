import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import sequelize from '../db/config';

@Injectable()
export class TicketsService {
  create(createTicketDto: CreateTicketDto) {
    console.log('createTicketDto', createTicketDto);
    return 'This action adds a new ticket';
  }

  findAll() {
    return sequelize.models.Tickets.findAll({
      include: [
        {
          model: sequelize.models.Flight,
          as: 'flight',
        },
      ],
    });
  }

  async findBySessionId(sessionId: string) {
    console.log('sessionId', sessionId);
    const user = await sequelize.models.Users.findOne({
      where: {
        sessionId: sessionId,
      },
    });
    if (!user) {
      return 'User not found';
    }
    return sequelize.models.Tickets.findAll({
      where: {
        userId: user.dataValues.id,
      },
      include: [
        {
          model: sequelize.models.Flight,
          as: 'flight',
        },
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    console.log('updateTicketDto', updateTicketDto);
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }

  async getLastBoughtTicket(sessionId: string) {
    const user = await sequelize.models.Users.findOne({
      where: {
        sessionId: sessionId,
      },
    });
    if (!user) {
      return 'User not found';
    }
    const ticket = await sequelize.models.Tickets.findOne({
      where: {
        userId: user.dataValues.id,
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id'],
      include: [
        {
          model: sequelize.models.Flight,
          as: 'flight',
          attributes: ['arrivalAirportId'],
        },
      ],
    });

    const result = {
      id: ticket.getDataValue('id'),
      arrivalAirportId: ticket
        .getDataValue('flight')
        .getDataValue('arrivalAirportId'),
    };

    return result;
  }
}
