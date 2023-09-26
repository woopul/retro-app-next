import { cn } from '@/utils/cn';
import { type HtmlHTMLAttributes } from 'react';

export type AddButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const AddButton = ({ className, ...rest }: AddButtonProps) => {
  return (
    <button
      className={cn(
        'flex aspect-square w-12 items-center justify-center rounded-full bg-white/10 text-white',
        'hover:bg-white/20',
        className,
      )}
      {...rest}
    >
      <span className="-mt-0.5 text-2xl leading-none">+</span>
    </button>
  );
};
