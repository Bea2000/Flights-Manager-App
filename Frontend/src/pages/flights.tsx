import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';
import FlightsDashboard from '@/components/FlightsDashboard';
import { useAuth0 } from '@auth0/auth0-react';
import FlightInfo from '@/components/FlightInfo';

export default function FlightsPage() {
  const { user, isLoading } = useAuth0();
  const router = useRouter();
  // eslint-disable-next-line camelcase
  const { id } = router.query; // Extrae el ID directamente del objeto query

  if (isLoading) return <div>Loading...</div>;

  const flightId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  if (flightId === undefined) {
    return (
      <main className="flex h-screen w-full flex-col bg-white justify-center">
        {user ? (
          <div className="flex w-full h-full flex-col items-center gap-8 justify-center">
            <NavBar />
            <FlightsDashboard />
          </div>
        ) : (
          <div className="flex w-full h-full flex-col items-center gap-8">
            <NavBar />
          </div>
        )}
      </main>
    );
  }
  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <div className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
          <FlightInfo id={flightId} />
        </div>
      ) : (
        <div className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
        </div>
      )}
    </main>
  );
}
