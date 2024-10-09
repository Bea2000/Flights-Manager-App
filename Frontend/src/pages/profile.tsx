'use client';

import NavBar from '@/components/NavBar';
import ProfileInfo from '@/components/ProfileInfo';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProfilePage() {
  const { user, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <div className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
          <ProfileInfo />
        </div>
      ) : (
        <div className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
        </div>
      )}
    </main>
  );
}
