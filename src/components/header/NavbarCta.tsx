'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { MoveUpRightIcon } from 'lucide-react';

import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { truncate } from '@/lib/utils';

import { TextScramble } from '../../../components/motion-primitives/text-scramble';

export function NavbarCta() {
  const router = useRouter();
  const { publicKey, select, disconnect, wallets, connected } = useWallet();

  const rawKey = useMemo(() => publicKey?.toBase58() ?? '', [publicKey]);

  const displayKey = useMemo(() => (rawKey ? truncate(rawKey) : ''), [rawKey]);

  const handleConnect = async () => {
    select(wallets[0].adapter.name);
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <section className="w-fit flex items-center">
      <button
        className="relative border-r h-full px-10 cursor-pointer flex items-center w-[144px]
        text-white/80 hover:text-primary transition-colors duration-200
      "
        onClick={!connected ? handleConnect : handleDisconnect}
      >
        {!connected ? 'Connect' : <TextScramble>{displayKey}</TextScramble>}
        <FlickeringGrid
          className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
          squareSize={2}
          gridGap={2}
          color="#6B7280"
          maxOpacity={0.3}
          flickerChance={0.5}
        />
      </button>
      <button
        className="relative h-full cursor-pointer flex items-center px-10
      text-white/80 hover:text-primary transition-colors duration-200
      "
        onClick={() => router.push('/fundraise')}
      >
        Start a Fundraiser
        <MoveUpRightIcon className="ml-2 font-extralight" size={16} />
        <FlickeringGrid
          className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
          squareSize={2}
          gridGap={2}
          color="#6B7280"
          maxOpacity={0.3}
          flickerChance={0.5}
        />
      </button>
    </section>
  );
}
