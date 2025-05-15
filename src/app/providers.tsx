'use client';

import { AppWalletProvider } from '@/contexts';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppWalletProvider>{children}</AppWalletProvider>;
}
