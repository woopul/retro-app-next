/* eslint-disable @typescript-eslint/no-unsafe-return */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
