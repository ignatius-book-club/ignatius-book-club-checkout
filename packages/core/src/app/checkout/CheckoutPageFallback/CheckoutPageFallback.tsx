import React from 'react';
import { IBCHeader } from '../IBCHeader/IBCHeader';
import { ibcUrl } from '../utils/checkout-utils';
import { CardFallback } from './CardFallback/CardFallback';

export const CheckoutPageFallback = () => {
  return (
    <div>
      <IBCHeader />

      <div className="bg-light-page-bg ibc-container relative z-40 py-8 lg:py-16 min-h-100vh">
        <div className="ibc-container-fixed">
          <h1 className="text-ibc-blue items flex justify-between text-3xl font-semibold capitalize mb-0">
            Checkout
            <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover text-primary bg-ibc-gray p-0">
              <a
                className="flex h-full w-full items-center justify-center px-2"
                href={`${ibcUrl}/cart`}
              >
                Edit Cart
              </a>
            </button>
          </h1>
          <div className="py-10">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 flex flex-col gap-8">
                <CardFallback className="h-16 bg-white" shimmerClassName="loading-shimmer-gray" />
                <CardFallback className="h-16 bg-white" shimmerClassName="loading-shimmer-gray" />
                <CardFallback className="h-16 bg-white" shimmerClassName="loading-shimmer-gray" />
                <CardFallback className="h-80 bg-white" shimmerClassName="loading-shimmer-gray" />
              </div>
              <div className="col-span-1">
                <CardFallback className="h-full bg-white" shimmerClassName="loading-shimmer-gray" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
