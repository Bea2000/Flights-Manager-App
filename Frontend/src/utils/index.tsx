import axios from 'axios';
import { Coordinates } from '@/types';

// convert date format to YY MM DD HH:SS
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export default formatDate;

export async function getMyIP(): Promise<Coordinates> {
  try {
    // const response = await axios.get('https://api.ipify.org?format=json');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/ip`);
    const locationInfo: Coordinates = {
      lat: response.data.lat,
      lon: response.data.lon,
    };
    return locationInfo;
  } catch (error) {
    console.log(error);
    return {
      lat: 0,
      lon: 0,
    };
  }
}

export interface AddressType {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export async function getCoordinatesFromLocation(location: string): Promise<Coordinates> {
  try {
    const response = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=6644b7d57947c208485978dacc7bcd6`);
    const locationInfo = response.data.find((address : AddressType) => address.display_name.includes('Airport')) || response.data[0];
    return {
      lat: parseFloat(locationInfo.lat),
      lon: parseFloat(locationInfo.lon),
    };
  } catch (error) {
    console.log(error);
    return {
      lat: 0,
      lon: 0,
    };
  }
}
