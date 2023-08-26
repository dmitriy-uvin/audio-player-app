import { InputProps } from '@/components/input/types';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }: InputProps, ref
  ) => {
  return (
    <input
      ref={ref}
      type={type}
      className={twMerge(`
        flex
        w-full
        rounded-md
        bg-neutral-700
        border
        border-transparent
        p-3
        text-sm
        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium
        placeholder:text-neutral-400
        disabled:cursor-not-allowed
        disabled:opacity-50
        focus:outline-none
      `,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export { Input };