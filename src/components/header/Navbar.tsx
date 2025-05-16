'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavbarCta } from './NavbarCta';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'CAMPAIGNS', href: '/campaigns' },
    // { label: 'FUNDRAISE', href: '/fundraise' },
    { label: 'DASHBOARD', href: '/dashboard' },
  ];

  return (
    <section className="h-20 flex items-center border-l border-r w-full font-light">
      <Link href="/" className="h-full">
        <div className="relative flex items-center px-10 border-r h-full cursor-pointer">
          <Image
            src="assets/logos/full-logo.svg"
            alt="logo"
            width={150}
            height={32}
          />
          <FlickeringGrid
            className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
            squareSize={2}
            gridGap={2}
            color="#6B7280"
            maxOpacity={0.3}
            flickerChance={0.5}
          />
        </div>
      </Link>

      <section className="flex h-full w-full justify-between">
        <nav className="flex flex-1 items-center gap-5 px-10 text-sm border-r h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-5 transition-colors duration-200 underline-offset-2 ${
                  isActive
                    ? 'text-primary underline'
                    : 'text-white/50 hover:text-primary hover:underline'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <NavbarCta />
      </section>
    </section>
  );
};
