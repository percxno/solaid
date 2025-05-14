import React from 'react';
import { MoveUpRightIcon } from 'lucide-react';

export function NavbarCta() {
  return (
    <section className="w-fit flex items-center px-5 gap-5">
      <button
        className="border-r h-full pr-5 cursor-pointer flex items-center
        text-white/50 hover:text-primary transition-colors duration-200
      "
      >
        Connect
      </button>
      <button
        className="h-full cursor-pointer flex items-center
      text-white/50 hover:text-primary transition-colors duration-200
      "
      >
        Start a Fundraiser
        <MoveUpRightIcon className="ml-2 font-extralight" size={16} />
      </button>
    </section>
  );
}
