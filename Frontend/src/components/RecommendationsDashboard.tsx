import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FlightType } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { UserAPI } from '@/api/user.api';
import { FlightAPI } from '@/api/flight.api';
import FlightCard from './FlightCard';

export default function RecommendationsDashboard() {
  const [recommendations, setRecommendations] = useState<FlightType[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('never');
  const { user } = useAuth0();

  const fetchRecommendations = async () => {
    try {
      const fetchedRecommendations = await UserAPI.getUserRecommendations(user?.sub || '');
      setLastUpdated(fetchedRecommendations.data.recommendationsDate);
      const recommendationsResult = await FlightAPI.getRecommendations(
        fetchedRecommendations.data.recommendationsId,
      );
      const flightsPromises = recommendationsResult.data.result.map(
        async (rec: { flight_id: number }) => {
          const flightData = await FlightAPI.getFlight(rec.flight_id);
          return flightData.data;
        },
      );
      const flights = await Promise.all(flightsPromises);
      setRecommendations(flights);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [user]);

  if (user) {
    return (
      <Box className="h-full w-full flex flex-col">
        <Box className="flex flex-col justify-center items-center mt-8">
          <Typography variant="h5">
            Last updated on:
            {' '}
            { lastUpdated }
          </Typography>
        </Box>
        <Box className="h-full w-full grid gap-8 flex-wrap p-8 grid-cols-3">
          {
            recommendations.map((recommendation) => (
              <Box key={recommendation.id}>
                <FlightCard flight={recommendation} key={recommendation.id} />
              </Box>
            ))
          }
        </Box>
      </Box>
    );
  }
}
