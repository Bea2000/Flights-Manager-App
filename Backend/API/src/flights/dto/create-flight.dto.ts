import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AirportDto {
  @IsString()
  name: string;

  @IsString()
  id: string;

  @IsString()
  time: string;
}

class FlightDto {
  @ValidateNested()
  @Type(() => AirportDto)
  departure_airport: AirportDto;

  @ValidateNested()
  @Type(() => AirportDto)
  arrival_airport: AirportDto;

  @IsNumber()
  duration: number;

  @IsString()
  airplane: string;

  @IsString()
  airline: string;

  @IsString()
  airline_logo: string;
}

class CarbonEmissionDto {
  @IsNumber()
  this_flight: number;
}

export class CreateFlightDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightDto)
  flights: FlightDto[];

  @IsNumber()
  price: number;

  @ValidateNested()
  @Type(() => CarbonEmissionDto)
  carbonEmission: CarbonEmissionDto;

  @IsString()
  airlineLogo: string;

  @IsString()
  currency: string;
}

export class CreateFlightModelDto {
  departureAirportId: string;
  departureDate: Date;
  arrivalAirportId: string;
  arrivalDate: Date;
  duration: number;
  airplane: string;
  airline: string;
  price: number;
  carbonEmission: number;
  airlineLogo: string;
  currency: string;
  quantity: number;
}
