'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { categories } from '@/lib/categories';

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

      <section className="w-full my-40">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 rounded-lg">
          {categories.map(({ name, icon: Icon }, index) => (
            <Link
              key={name}
              href={`/campaigns/${name.toLowerCase()}`}
              className={cn(
                'aspect-square cursor-pointer border relative flex flex-col justify-between p-6 text-white/50 hover:text-primary transition-colors',
                'hover:border hover:border-white'
              )}
            >
              <Icon size={24} />
              <span className="text-lg font-light">{name}</span>
              <FlickeringGrid
                className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
                squareSize={2}
                gridGap={2}
                color="#6B7280"
                maxOpacity={0.3}
                flickerChance={0.5}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
