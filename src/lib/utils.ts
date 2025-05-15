import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (str: string, start = 2, end = 3) =>
  str.length > start + end
    ? `${str.slice(0, start)}...${str.slice(-end)}`
    : str;
