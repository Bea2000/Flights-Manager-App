import React, { useState } from 'react';
import { TicketType } from '@/types';
import { downloadReceipt } from '@/api/download.api';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Typography,
  CardContent,
  Card,
  Button,
} from '@mui/material';
import formatDate from '@/utils';

export default function TicketCard({ ticket }: { ticket: TicketType }) {
  const { user } = useAuth0();
  const [link, setLink] = useState('');

  const handleDownloadReceipt = async () => {
    try {
      const receipt = await downloadReceipt(
        user?.nickname ?? '',
        user?.email ?? '', // Provide a default value for user?.email
        ticket.flight.departureAirportId,
        ticket.flight.departureDate,
        ticket.flight.arrivalAirportId,
        ticket.flight.arrivalDate,
        ticket.flight.price,
        ticket.quantity,
      );
      setLink(JSON.parse(receipt.body).link);
    } catch (error) {
      console.error('Error downloading receipt', error);
    }
  };

  return (
    <Card className="w-64" variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          fecha:
          {' '}
          {formatDate(ticket.flight.departureDate)}
        </Typography>
        <Typography variant="h5" component="div">
          {ticket.flight.departureAirportId}
          {' '}
          to
          {' '}
          {ticket.flight.arrivalAirportId}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Airline:
          {' '}
          {ticket.flight.airline}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Cantidad Comprada:
          {' '}
          {ticket.quantity}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDownloadReceipt}>
          Generar Boleta
        </Button>
        {link && (
          <Button onClick={
            () => window.open(link, '_blank')
          }
          >
            Ver Boleta
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
