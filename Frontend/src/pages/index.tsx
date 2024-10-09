/* eslint-disable camelcase */

'use client';

import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '@/components/NavBar';
import FlightsDashboard from '@/components/FlightsDashboard';
import { useRouter } from 'next/router';
import {
  Typography, Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserAPI } from '../api/user.api';

export default function Home() {
  const { user, isLoading } = useAuth0();
  const [isEffectExecuted, setIsEffectExecuted] = useState(false);
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  // eslint-disable-next-line camelcase
  const { token_ws } = router.query; // Extrae el ID directamente del objeto query

  useEffect(() => {
    // Solo actualizar el token si token_ws es una cadena y diferente al token actual
    if (typeof token_ws === 'string' && token_ws !== token) {
      setToken(token_ws);
    }
  }, [token_ws, token]);

  useEffect(() => {
    if (user && !isEffectExecuted) {
      const registerUserToDB = async () => {
        setIsEffectExecuted(true);
        if (user) {
          const userId = user?.sub || '';
          const email = user?.email || '';
          const username = user?.nickname || '';

          // Check if user exists in the system
          const existingUser = await UserAPI.checkUser(userId);

          // If user does not exist, create a new user
          if (!existingUser.data) {
            await UserAPI.login({ sessionId: userId, email, username });
          }
        }
      };
      registerUserToDB();
    }
  }, [isEffectExecuted, user]);

  if (isLoading) return <Box className="flex w-full h-full items-center justify-center">Loading...</Box>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <Box className="flex w-full h-full flex-col items-center gap-8 justify-center">
          <NavBar />
          <Typography variant="h4" className="text-black">
            Welcome
            {' '}
            {user?.nickname || ''}
            {' '}
            !
          </Typography>
          { token !== '' ? (
            <Link href={`/transbank?token_ws=${token}`}>
              Check Your Transaction
            </Link>
          ) : (
            <div />
          )}
          <FlightsDashboard />
        </Box>
      ) : (
        <Box className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
        </Box>
      )}
    </main>
  );
}
