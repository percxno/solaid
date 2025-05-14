import React from 'react';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <section className="h-20 flex items-center border-l border-r w-full font-light">
      <div className="flex items-center px-5 border-r h-full cursor-pointer">
        <Image
          src="assets/logos/full-logo.svg"
          alt="logo"
          width={150}
          height={32}
        />
      </div>
    </section>
  );
};
