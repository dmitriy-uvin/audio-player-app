'use client'
import { ReactNode } from 'react';
import { UserContextProvider } from '@/hooks/use-user';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>{children}</UserContextProvider>
  );
}