import { ButtonProps } from '@/components/button/types';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
     children,
     type = 'button',
     className ,
    disabled,
    ...props
   }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={twMerge(`
          w-full
          rounded-full
          bg-green-500
          border
          border-transparent
          p-3
          disabled:cursor-not-allowed
          disabled:opacity-50
          text-black
          font-bold
          hover:opacity-75
          transition
        `, className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
)

Button.displayName = 'Button';

export { Button };
