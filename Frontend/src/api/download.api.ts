/* eslint-disable camelcase */
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const downloadReceipt = async (
  user_name: string,
  email: string,
  departure_airport: string,
  departure_date: string,
  arrival_airport: string,
  arrival_date: string,
  price: number,
  quantity: number,
) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/receipt`, {
      user_name,
      email,
      departure_airport,
      departure_date,
      arrival_airport,
      arrival_date,
      price,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading receipt', error);
    throw error;
  }
};
