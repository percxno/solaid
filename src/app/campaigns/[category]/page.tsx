import React from 'react';
import Link from 'next/link';

import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import {
  categories,
  categorieHeroContent,
  categoryIconMap,
} from '@/lib/categories';
import { mockCampaigns, type Campaign } from '@/lib/mock';

export const revalidate = 60;

export function generateStaticParams() {
  return categories.map(({ name }) => ({
    category: name.toLowerCase(),
  }));
}

export default async function CampaignCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const slug = category.toLowerCase();
  const displayName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const Icon = categoryIconMap[slug];

  const { heading, subheading } = categorieHeroContent[slug] ?? {
    heading: `${displayName} Campaigns`,
    subheading: `Browse urgent fundraisers for ${displayName.toLowerCase()} causes.`,
  };

  const campaigns = mockCampaigns.filter((c) => c.category === slug);

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
          <p className="text-white/50">No campaigns found for {displayName}.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2">{c.title}</h2>
                  <p className="text-gray-600 mb-1">
                    <strong>Beneficiary:</strong> {c.beneficiary}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Goal:</strong> ${c.amount.toLocaleString()}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {c.story}
                  </p>
                </div>
                <FlickeringGrid
                  className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
                  squareSize={2}
                  gridGap={2}
                  color="#6B7280"
                  maxOpacity={0.3}
                  flickerChance={0.5}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
