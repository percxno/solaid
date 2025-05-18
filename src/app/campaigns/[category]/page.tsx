import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  categories,
  categorieHeroContent,
  categoryIconMap,
} from '@/lib/categories';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const revalidate = 60;

export function generateStaticParams() {
  return categories.map(({ name }) => ({
    category: name.toLowerCase(),
  }));
}

export default async function CampaignCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const slug = category.toLowerCase();
  const displayName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const Icon = categoryIconMap[slug];

  const { heading, subheading } = categorieHeroContent[slug] ?? {
    heading: `${displayName} Campaigns`,
    subheading: `Browse urgent fundraisers for ${displayName.toLowerCase()} causes.`,
  };

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/campaigns?category=${slug}`,
  //   { next: { revalidate: 10 } }
  // );

  const campaigns: any = [];

  return (
    <main className="main-container container items-center flex-col">
      <section className="flex flex-col mt-32 gap-10 justify-between bg-transparent w-full">
        <p className="flex gap-2 items-center font-light text-white/50 text-xs">
          <Link href="/campaigns" className="hover:underline">
            / CAMPAIGNS
          </Link>
          - {displayName.toUpperCase()}{' '}
          <span>
            <Icon size={12} />{' '}
          </span>
        </p>
        <h1 className="text-7xl w-1/2 whitespace-nowrap">{heading}</h1>
        <h4 className="text-3xl mt-5 w-2/3 font-light text-white/80">
          {subheading}
        </h4>
      </section>

      <section className="w-full my-40">
        {campaigns.length === 0 ? (
          <p className="text-white/50 font-light">
            No campaigns found for {displayName}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {campaigns.map(
              (c: {
                id: string;
                title: string;
                mediaUrl?: string;
                goalAmount?: number;
              }) => (
                <Link href={`/donate/${c.id}`} key={c.id}>
                  <div
                    className={cn(
                      'group relative bg-transparent rounded-lg shadow-md overflow-hidden border',
                      'cursor-pointer hover:border-white transition-all duration-200 p-6'
                    )}
                  >
                    <Image
                      src={c.mediaUrl || '/placeholder.jpg'}
                      alt={c.title}
                      width={500}
                      height={500}
                      className="w-full h-48 object-cover rounded-[6px]"
                    />
                    <div className="mt-4 justify-between">
                      <h2 className="text-lg font-semibold mb-2 h-14 line-clamp-2">
                        {c.title}
                      </h2>
                      <p className="text-white/50 text-sm line-clamp-3 mt-10">
                        {c.goalAmount?.toLocaleString() || '0'} SOL needed
                      </p>
                    </div>
                    <Button
                      className={cn(
                        'bg-[#1A1A1A] text-white group-hover:bg-white group-hover:text-black transition-colors duration-200',
                        'text-base mt-5 rounded-[6px] h-12 px-10 w-full cursor-pointer'
                      )}
                    >
                      Donate
                    </Button>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}
