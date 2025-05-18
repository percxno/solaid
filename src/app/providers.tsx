'use client';

import { AppWalletProvider } from '@/contexts';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppWalletProvider>
      <SessionProvider>{children}</SessionProvider>
    </AppWalletProvider>
  );
}
