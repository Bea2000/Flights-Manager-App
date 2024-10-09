import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import sequelize from '../db/config';
import { Op } from 'sequelize';

@Injectable()
export class FlightsService {
  async create(createFlightDto: CreateFlightDto) {
    console.log(createFlightDto);
    let departureAirport = await sequelize.models.Airport.findByPk(
      createFlightDto.flights[0].departure_airport.id,
    );
    if (!departureAirport) {
      departureAirport = await CreateAirPort(
        createFlightDto.flights[0].departure_airport.id,
        createFlightDto.flights[0].departure_airport.name,
      );
    }
    const arrivalAirport = await sequelize.models.Airport.findByPk(
      createFlightDto.flights[0].arrival_airport.id,
    );

    if (!arrivalAirport) {
      await CreateAirPort(
        createFlightDto.flights[0].arrival_airport.id,
        createFlightDto.flights[0].arrival_airport.name,
      );
    }
    const flight_data = {
      departureAirportId: createFlightDto.flights[0].departure_airport.id,
      departureDate: createFlightDto.flights[0].departure_airport.time,
      arrivalAirportId: createFlightDto.flights[0].arrival_airport.id,
      arrivalDate: createFlightDto.flights[0].arrival_airport.time,
      duration: createFlightDto.flights[0].duration,
      airplane: createFlightDto.flights[0].airplane,
      airline: createFlightDto.flights[0].airline,
      price: createFlightDto.price,
      carbonEmission: createFlightDto.carbonEmission.this_flight,
      airlineLogo: createFlightDto.airlineLogo,
      currency: createFlightDto.currency,
      quantity: 90,
    };
    console.log(flight_data);
    const flight = sequelize.models.Flight.create(flight_data);
    return flight;
  }

  async findAll({ departure, arrival, date, amount, page }) {
    const where = {};
    if (departure) {
      where['departureAirportId'] = departure;
    }
    if (arrival) {
      where['arrivalAirportId'] = arrival;
    }
    if (date) {
      where['departureDate'] = date;
    }
    const limit = amount || 25; // Default to 10 items per page if amount not specified
    const currentPage = page || 1; // Default to page 1 if page not specified
    const offset = (currentPage - 1) * limit;

    return sequelize.models.Flight.findAll({
      where,
      limit,
      offset,
    });
  }

  async findOne(id: number) {
    return sequelize.models.Flight.findByPk(id);
  }

  async findUpcomingFlights(purchaseDate: Date, destinationAirportId: string) {
    const oneWeekLater = new Date(purchaseDate);
    oneWeekLater.setDate(purchaseDate.getDate() + 7);

    return sequelize.models.Flight.findAll({
      where: {
        departureAirportId: destinationAirportId,
        departureDate: {
          [Op.between]: [purchaseDate, oneWeekLater],
        },
      },
      order: [['departureDate', 'ASC']],
      attributes: ['id', 'price', 'arrivalAirportId'],
      limit: 20,
    });
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    console.log(updateFlightDto);
    const flight = sequelize.models.Flight.update(updateFlightDto, {
      where: {
        id: id,
      },
    });
    return flight;
  }

  remove(id: number) {
    return sequelize.models.Flight.destroy({
      where: {
        id: id,
      },
    });
  }
}
async function CreateAirPort(id: string, name: string) {
  return await sequelize.models.Airport.create({
    id: id,
    name: name,
  });
}
