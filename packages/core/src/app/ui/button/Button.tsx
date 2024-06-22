import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFullWidth?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
  testId?: string;
  variant?: ButtonVariant;
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Action = 'action',
}

export enum ButtonSize {
  Small = 'small',
  Tiny = 'tiny',
  Large = 'large',
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  disabled,
  isFullWidth,
  isLoading,
  size,
  testId,
  type,
  variant,
  ...rest
}) => (
  <button
    {...rest}
    className={twMerge(
      classNames(
        'z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none hover:opacity-70 bg-primary text-white ibc-button',
        { 'is-loading': isLoading, 'w-full': isFullWidth },
        {
          'h-10 text-small px-4 min-w-20 gap-2': size === ButtonSize.Small || ButtonSize.Tiny,
          'h-12 text-medium px-6 min-w-24 gap-3': size === ButtonSize.Large,
        },
      ),
      className,
    )}
    data-test={testId}
    disabled={disabled || isLoading}
    type={type || 'button'}
  >
    {children}
  </button>
);

export default Button;
