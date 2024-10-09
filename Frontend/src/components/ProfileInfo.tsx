import React, { useState, useEffect } from 'react';
import {
  Typography, Box,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { FlightAPI } from '@/api/flight.api';
import { TicketType } from '@/types';
import TicketCard from './TicketCard';

export default function ProfileInfo() {
  const { user } = useAuth0();
  const [tickets, setTicket] = useState<TicketType[]>([
    {
      createdAt: '',
      userId: 0,
      updatedAt: '',
      quantity: 0,
      id: 0,
      flightId: 0,
      flight: {
        airline: '',
        airlineLogo: '',
        airplane: '',
        arrivalAirportId: '',
        arrivalDate: '',
        carbonEmission: '',
        createdAt: '',
        currency: '',
        departureAirportId: '',
        departureDate: '',
        duration: 0,
        id: 0,
        price: 0,
        quantity: 0,
        updatedAt: '',
      },
    },
  ]);
  const [isEffectExecuted, setIsEffectExecuted] = useState(false);

  useEffect(() => {
    if (user && !isEffectExecuted) {
      const fetchTicket = async (): Promise<void> => {
        try {
          const ticketToFetch = await FlightAPI.getAllTickets(user.sub || '');
          const fetchedTickets = await Promise.all(
            ticketToFetch.data.map(async (ticketItem: TicketType) => {
              const flight = await FlightAPI.getFlight(ticketItem.flightId);
              const updatedTicket = { ...ticketItem, flight: flight.data };
              return updatedTicket;
            }),
          );
          setTicket(fetchedTickets);
          setIsEffectExecuted(true);
        } catch (error) {
          console.error('Error fetching flight:', error);
        }
      };

      fetchTicket();
    }
  }, [user, isEffectExecuted]);

  if (user) {
    return (
      <Box className="h-full w-full flex flex-col">
        <Box className="flex items-center gap-4 flex-col">
          <Typography variant="h4" component="div" sx={{ marginLeft: 2 }} className="text-black">
            {user?.nickname || ''}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Email:
            {' '}
            <strong>{user?.email}</strong>
          </Typography>
        </Box>
        <Box className="h-full w-full grid gap-8 flex-wrap p-8 grid-cols-3">
          {
            tickets.map((ticket) => (
              <Box key={ticket.id}>
                <TicketCard ticket={ticket} key={ticket.id} />
              </Box>
            ))
          }
        </Box>
      </Box>
    );
  }
}
