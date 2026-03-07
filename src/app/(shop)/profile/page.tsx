'use client';
import React from 'react';

import { useAuth } from '@/lib/context/authContext';

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <div>ProfilePage</div>
      <pre className="text-sm overflow-clip">
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  );
}
