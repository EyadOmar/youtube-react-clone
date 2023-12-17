import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(['transition-colors'], {
  variants: {
    variant: {
      default: ['bg-secondary', 'hover:bg-secondary-hover'],
      ghost: ['hover:bg-gray-100'],
    },
    size: {
      default: ['rounded', 'p-2'],
      icon: [
        'rounded-full',
        'border-none',
        'outline-none',
        'h-10',
        'w-10',
        'flex',
        'justify-center',
        'items-center',
        'p-2.5',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>;

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}

export default Button;