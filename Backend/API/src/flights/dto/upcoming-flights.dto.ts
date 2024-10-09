// src/flights/dto/upcoming-flights.dto.ts
import { IsDateString, IsString } from 'class-validator';

export class UpcomingFlightsDto {
  @IsDateString()
  purchaseDate: string;

  @IsString()
  destinationAirportId: string;
}
