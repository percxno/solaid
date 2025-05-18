'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Campaign {
  id: string;
  title: string;
  mediaUrl: string;
  goalAmount: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session.user?.email) {
      setLoading(true);
      fetch(`/api/campaigns?email=${encodeURIComponent(session.user.email)}`)
        .then(async (res) => {
          if (!res.ok) throw new Error(await res.text());
          return res.json() as Promise<Campaign[]>;
        })
        .then((data) => setCampaigns(data))
        .catch((err) => {
          console.error(err);
          setError('Failed to load your campaigns.');
        })
        .finally(() => setLoading(false));
    }
  }, [status, session]);

  return (
    <main className="main-container container items-center flex-col">
      {/* Header: always shown */}
      <section className="flex flex-col mt-32 gap-10 justify-between bg-transparent w-full">
        <p className="font-light text-white/50 text-xs">/ DASHBOARD</p>
        <h1 className="text-7xl w-1/2 whitespace-nowrap">Your Fundraisers</h1>
        <h4 className="text-3xl mt-5 w-2/3 font-light text-white/80">
          View and track all your active campaigns in one place.
        </h4>
      </section>

      {/* Body: varies by auth & data state */}
      <section className="w-full my-40">
        {status === 'loading' && (
          <p className="text-center">Checking authentication…</p>
        )}

        {status === 'unauthenticated' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/50">
              Connect with Google to view your fundraisers.
            </p>
            <Button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            >
              Connect with Google
            </Button>
          </div>
        )}

        {status === 'authenticated' && (
          <>
            {loading ? (
              <p className="text-center">Loading campaigns…</p>
            ) : error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : campaigns && campaigns.length === 0 ? (
              <p className="text-white/50 font-light">
                You haven’t created any campaigns yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {campaigns?.map((c) => (
                  <Link href={`/donate/${c.id}`} key={c.id}>
                    <div
                      className={cn(
                        'group relative bg-transparent rounded-lg shadow-md overflow-hidden border',
                        'cursor-pointer hover:border-white transition-all duration-200 p-6'
                      )}
                    >
                      <Image
                        src={c.mediaUrl}
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
                          {c.goalAmount.toLocaleString()} SOL needed
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
          </>
        )}
      </section>
    </main>
  );
}
