import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('/user/:sessionId')
  findByUserId(@Param('sessionId') sessionId: string) {
    return this.ticketsService.findBySessionId(sessionId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ticketsService.remove(id);
  }

  @Get('/last/:sessionId')
  async getLastBoughtTicket(@Param('sessionId') sessionId: string) {
    return await this.ticketsService.getLastBoughtTicket(sessionId);
  }
}
