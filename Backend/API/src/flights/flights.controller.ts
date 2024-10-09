import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { UpcomingFlightsDto } from './dto/upcoming-flights.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.flightsService.findAll({
      departure: params.departure,
      arrival: params.arrival,
      date: params.date,
      amount: params.amount,
      page: params.page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(+id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(+id);
  }

  @Post('upcoming')
  async getUpcomingFlights(@Body() params: UpcomingFlightsDto) {
    const { purchaseDate, destinationAirportId } = params;
    const purchaseDateObj = new Date(purchaseDate);
    return this.flightsService.findUpcomingFlights(
      purchaseDateObj,
      destinationAirportId,
    );
  }
}
