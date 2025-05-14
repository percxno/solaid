import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <section className="h-20 flex items-center border-l border-r w-full font-light">
      <div className="flex items-center px-5 border-r h-full cursor-pointer">
        <Link href="/">
          <Image
            src="assets/logos/full-logo.svg"
            alt="logo"
            width={150}
            height={32}
          />
        </Link>
      </div>
    </section>
  );
};
