'use client';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { MailIcon, WalletIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import { useShallow } from 'zustand/shallow';

export function VerifyStep() {
  const { data: session } = useSession();
  const { publicKey, select, disconnect, wallets, connected } = useWallet();

  const {
    email,
    walletAddress,
    setEmail,
    setCampaignOwnerName,
    setWalletAddress,
  } = useCreateCampaignStore(
    useShallow((s) => ({
      email: s.email,
      walletAddress: s.walletAddress,
      setEmail: s.setEmail,
      setCampaignOwnerName: s.setCampaignOwnerName,
      setWalletAddress: s.setWalletAddress,
    }))
  );

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
      setCampaignOwnerName(session.user.name || 'Anonymous');
    }
  }, [session, setEmail]);

  // whenever wallet connect/disconnect, sync into store
  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toBase58());
    } else {
      setWalletAddress('');
    }
  }, [publicKey, setWalletAddress]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button
          variant={walletAddress ? 'default' : 'outline'}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={() =>
            connected ? disconnect() : select(wallets[0].adapter.name)
          }
        >
          <WalletIcon size={16} />
          {walletAddress
            ? `Wallet: ${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
            : 'Connect Wallet'}
        </Button>
        <Button
          variant={email ? 'default' : 'outline'}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={() =>
            signIn('google', { callbackUrl: '/fundraise?step=verify' })
          }
        >
          <MailIcon size={16} />
          {email ? `Signed in as ${email}` : 'Connect with Google'}
        </Button>
      </div>

      {/* Helpful hint */}
      {!email || !walletAddress ? (
        <p className="text-sm text-red-400">
          You must connect both email & wallet to finish.
        </p>
      ) : (
        <p className="text-sm text-green-500">All set! You can now finish.</p>
      )}
    </div>
  );
}
