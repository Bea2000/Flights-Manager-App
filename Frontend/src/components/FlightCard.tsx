import React from 'react';
import { FlightType } from '@/types';
import { useRouter } from 'next/router';

import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
} from '@mui/material';
import formatDate from '@/utils';

export default function FlightCard({ flight }: { flight: FlightType }) {
  const router = useRouter();
  return (
    <Card className="w-64" variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          fecha:
          {' '}
          {formatDate(flight.departureDate)}
        </Typography>
        <Typography variant="h5" component="div">
          {flight.departureAirportId}
          {' '}
          to
          {' '}
          {flight.arrivalAirportId}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Airline:
          {' '}
          {flight.airline}
        </Typography>
        <CardActions>
          <Button size="small" onClick={() => router.push(`/flights?id=${flight.id}`)}> Ver Detalles</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
