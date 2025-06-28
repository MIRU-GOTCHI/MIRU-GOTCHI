import Loading from '@common/components/Loading';
import { AuthContext } from '@context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import * as React from 'react';

import { auth } from '../firebase';

import type { User } from 'firebase/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userId = user?.uid || null;

  if (loading) return <Loading />;

  return <AuthContext.Provider value={{ user, userId }}>{children}</AuthContext.Provider>;
};
