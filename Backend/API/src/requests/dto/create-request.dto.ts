import { IsNumber, IsString } from 'class-validator';

export class CreateRequestDto {
  // @IsString()
  // 'request_id': string;

  // @IsNumber()
  // 'user_id': number; // puede ser un numero de grupo si es así tiene que ser un munero negativo

  // @IsString()
  // 'departure_airport': string;

  // @IsString()
  // 'arrival_airport': string;

  // @IsString()
  // 'departure_time': string;

  // @IsString()
  // 'datetime': string;

  @IsString()
  'deposit_token': string;

  // @IsNumber()
  // 'quantity': number;

  // @IsNumber()
  // 'seller': 0;
  @IsString()
  'session_id': string;

  @IsNumber()
  'flight_id': number;

  @IsNumber()
  'quantity': number;

  @IsString()
  'datetime': string;
}

export class CreateGroupRequestDto {
  @IsString()
  'request_id': string;

  @IsNumber()
  'group_id': number; // puede ser un numero de grupo si es así tiene que ser un munero negativo

  @IsString()
  'departure_airport': string;

  @IsString()
  'arrival_airport': string;

  @IsString()
  'departure_time': string;

  @IsString()
  'datetime': string;

  @IsString()
  'deposit_token': string;

  @IsNumber()
  'quantity': number;

  @IsNumber()
  'seller': 0;
}
