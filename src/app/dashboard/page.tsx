import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { mockCampaigns } from '@/lib/mock';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const revalidate = 60;

export default async function DashboardPage() {
  const campaigns = mockCampaigns;

  return (
    <main className="main-container container items-center flex-col">
      <section className="flex flex-col mt-32 gap-10 justify-between bg-transparent w-full">
        <p className="font-light text-white/50 text-xs">/ DASHBOARD</p>
        <h1 className="text-7xl w-1/2 whitespace-nowrap">Your Fundraisers</h1>
        <h4 className="text-3xl mt-5 w-2/3 font-light text-white/80">
          View and track all your active campaigns in one place.
        </h4>
      </section>

      <section className="w-full my-40">
        {campaigns.length === 0 ? (
          <p className="text-white/50 font-light">
            You haven’t created any campaigns yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {campaigns.map((c) => (
              <Link href={`/donate/${c.id}`} key={c.id}>
                <div
                  className={cn(
                    'group relative bg-transparent rounded-lg shadow-md overflow-hidden border',
                    'cursor-pointer hover:border-white transition-all duration-200 p-6'
                  )}
                >
                  <Image
                    src={c.imageUrl}
                    alt={c.title}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover rounded-[6px]"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2 h-14 line-clamp-2">
                      {c.title}
                    </h2>
                    <p className="text-white/50 text-sm line-clamp-3 mt-10">
                      ${c.amount.toLocaleString()} SOL needed
                    </p>
                  </div>
                  <Button
                    className={cn(
                      'bg-[#1A1A1A] text-white group-hover:bg-white group-hover:text-black transition-colors duration-200',
                      'text-base mt-5 rounded-[6px] h-12 px-10 w-full cursor-pointer'
                    )}
                  >
                    View
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
