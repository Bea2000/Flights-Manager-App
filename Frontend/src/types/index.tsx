export interface FlightType {
  airline: string,
  airlineLogo: string,
  airplane: string,
  arrivalAirportId: string,
  arrivalDate: string,
  carbonEmission: string,
  createdAt: string,
  currency: string,
  departureAirportId: string,
  departureDate: string,
  duration: number,
  id: number,
  price: number,
  quantity: number,
  updatedAt: string,
}

export interface TicketType {
  createdAt: string,
  userId: number;
  updatedAt: string,
  quantity: number;
  id: number,
  flightId: number;
  flight: FlightType;
}

export interface RequestType {
  session_id: string;
  quantity: number;
  flight_id: number;
  datetime: string;
  deposit_token: string;
}

export interface UserType {
  sessionId: string;
  email: string;
  username: string;
}

export interface createTransactionType {
  buy_order: string;
  session_id: string;
  amount: number;
  return_url: string;
}

export interface validateTransactionType {
  valid: boolean;
  request_id: string;
}

export interface upcomingFlightsType {
  purchaseDate: string;
  destinationAirportId: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

interface FlightCoordType {
  flight_coord: Coordinates
  flight_id: number;
  price: number;
}

export interface RecType {
  flights: FlightCoordType[];
  ip_coord: Coordinates;
}
