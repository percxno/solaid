import React from 'react';

import { cn } from '@/lib/utils';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';

const categories = [
  'Animal',
  'Business',
  'Community',
  'Creative',
  'Education',
  'Emergency',
  'Environment',
  'Event',
  'Faith',
  'Family',
  'Medical',
  'Memorial',
  'Nonprofit',
  'Sports',
  'Volunteer',
];

export default function Campaigns() {
  return (
    <main className="main-container container items-center flex-col">
      <section className="flex flex-col mt-32 gap-10 justify-between bg-transparent w-full">
        <p className="font-light text-white/50 text-xs">/ CAMPAIGNS</p>
        <h1 className="text-7xl w-1/2 whitespace-nowrap">
          Find a Cause That Moves You
        </h1>
        <h4 className="text-3xl mt-5 w-2/3 font-light text-white/80">
          {` From medical bills and disaster relief to community projects and
          education—discover urgent fundraisers.`}
        </h4>
      </section>

      <section className="w-4/5 my-40 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 roundded-lg divide-x divide-y">
          {categories.map((category, index) => (
            <div
              key={category}
              className={cn(
                'aspect-square cursor-pointer relative p-6 text-white/50 hover:text-primary',
                index === 0 && 'border-l',
                index < 5 && 'border-t',
                index === 5 && 'border-l',
                index === 10 && 'border-l border-b',
                index === 14 && 'border-r border-b'
              )}
            >
              <span className="text-lg font-light">{category}</span>
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
      </section>
    </main>
  );
}
