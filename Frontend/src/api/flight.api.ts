import { RequestType, RecType, upcomingFlightsType } from '@/types';
import { axiosInstance } from './base.api';

const viewFlights = `${process.env.NEXT_PUBLIC_API_BASE_URL}/flights`;
const viewTickets = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/user`;
const viewRequests = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests`;
const viewRecommendations = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/recommendations`;

// eslint-disable-next-line import/prefer-default-export
export const FlightAPI = {
  getFlights: (amount:number, page:number) => axiosInstance.get(`${viewFlights}?amount=${amount}&page=${page}`),
  getAllFlights: () => axiosInstance.get(viewFlights),
  getFlight: (id:number) => axiosInstance.get(`${viewFlights}/${id}`),
  getAllTickets: (sessionId: string) => axiosInstance.get(`${viewTickets}/${sessionId}`),
  bookFlight: (data: RequestType) => axiosInstance.post(viewRequests, data),
  getUpcomingFlights: (data: upcomingFlightsType) => axiosInstance.post(`${viewFlights}/upcoming`, data),
  generateRecommendations: (data: RecType, sessionId:string) => axiosInstance.post(`${viewRecommendations}/${sessionId}`, data),
  getRecommendations: (id:string) => axiosInstance.get(`${viewRecommendations}/${id}`),
  getRecommendationsStatus: () => axiosInstance.get(viewRecommendations),
};
