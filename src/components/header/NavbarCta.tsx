import React from 'react';
import { MoveUpRightIcon } from 'lucide-react';

import { FlickeringGrid } from '@/components/magicui/flickering-grid';

export function NavbarCta() {
  return (
    <section className="w-fit flex items-center">
      <button
        className="relative border-r h-full px-5 cursor-pointer flex items-center
        text-white/50 hover:text-primary transition-colors duration-200
      "
      >
        Connect
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
        className="relative h-full cursor-pointer flex items-center px-5
      text-white/50 hover:text-primary transition-colors duration-200
      "
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
