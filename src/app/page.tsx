import { MoveUpRightIcon } from 'lucide-react';

import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { Ripple } from '@/components/magicui/ripple';

export default function Home() {
  return (
    <main className="main-container container items-center flex-col">
      <section className="flex mt-32 gap-16 justify-between bg-transparent">
        <h1 className="text-7xl w-1/2 whitespace-nowrap">
          Emergency funds.
          <br />
          Instantly.
          <br /> On Solana.
        </h1>
        <p className="mt-10 font-light text-white/80 w-1/3">
          <span className="underline cursor-pointer text-primary">
            solaid.fund
          </span>{' '}
          helps you raise funds in minutes — powered by the speed and
          transparency of the Solana blockchain. Perfect for personal crises,
          medical bills, community needs, and more.
        </p>
      </section>
      <div className="relative h-[500px] w-[700px] flex justify-center">
        <Ripple className="absolute -top-[250px]" />
        <button
          className="cursor-pointer flex items-center px-10 uppercase h-[32px] mt-[110px] font-light
      text-white/80 hover:text-primary hover:underline transition-colors duration-200
      "
        >
          START FUNDRAISING
        </button>
      </div>
    </main>
  );
}
