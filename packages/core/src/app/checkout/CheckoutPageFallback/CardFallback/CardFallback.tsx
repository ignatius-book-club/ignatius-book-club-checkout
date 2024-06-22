import clsx from 'classnames';
import React from 'react';

type CardFallbackProps = {
  className?: string;
  shimmerClassName?: string;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '3xl' | 'full';
};

export const CardFallback = ({
  className = 'bg-ibc-gray h-full w-full',
  radius = '3xl',
  shimmerClassName = 'loading-shimmer-white',
}: CardFallbackProps) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-${radius}`}>
      <div className={clsx('absolute left-0 top-0 h-full w-1/2', shimmerClassName)}></div>
    </div>
  );
};
