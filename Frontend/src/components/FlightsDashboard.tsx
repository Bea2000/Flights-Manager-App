import React, { useState, useEffect } from 'react';

import {
  Box, Pagination,
} from '@mui/material';
import FlightCard from '@/components/FlightCard';
import { FlightAPI } from '@/api/flight.api';
import { FlightType } from '@/types';

export default function FlightsDashboard() {
  const [flights, setFlight] = useState<FlightType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchFlights = async () => {
    try {
      const allFlights = await FlightAPI.getAllFlights();
      setTotalPages(Math.ceil(allFlights.data.length / 3));
      const getFlights = await FlightAPI.getFlights(3, page);
      setFlight(getFlights.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [page]);

  return (
    <Box className="h-full w-full flex flex-col">
      <Box className="h-full w-full grid gap-8 flex-wrap p-8 grid-cols-3">
        {
          flights.map((flight) => (
            <Box key={flight.id}>
              <FlightCard flight={flight} key={flight.id} />
            </Box>
          ))
        }
      </Box>
      <Box className="flex flex-col items-center mb-8">
        <Pagination count={totalPages} page={page} onChange={handleChange} variant="outlined" />
      </Box>
    </Box>
  );
}
