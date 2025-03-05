import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Centralized container styling
export function containerClass(className: string = '') {
  return cn(
    'container mx-auto px-4 sm:px-6 lg:px-8',
    className
  );
}
