import { Address, Checkout } from '@bigcommerce/checkout-sdk';
import React from 'react';
import { AddressDisplay } from '../AddressDisplay/AddressDisplay';
import { ibcUrl } from '../utils/checkout-utils';
import { PriceDisplay } from '../../order/OrderSummarySubtotals';

type ShippingStepProps = {
  address: Address;
  checkout: Checkout;
};

export const ShippingStep = ({ address, checkout }: ShippingStepProps) => {
  const consignment = checkout.consignments?.[0];

  return (
    <div className="relative grid max-md:grid-cols-1 gap-4 md:grid-cols-3 border-light-border opacity-1 border-t py-6">
      <h2 className="text-ibc-blue col-span-1 text-2xl font-semibold m-0 capitalize">Shipping</h2>
      <div className="col-span-2 flex flex-col gap-4">
        <AddressDisplay
          displayConfig={{
            name: true,
            company: true,
            country: true,
          }}
          address={address}
        />

        {consignment?.selectedShippingOption?.id && (
          <span className="border-light-border text-ibc-blue border-t pt-4 text-large">
            {consignment?.selectedShippingOption?.description}:{' '}
            <PriceDisplay amount={consignment.selectedShippingOption.cost} />
          </span>
        )}
      </div>
      <a
        href={`${ibcUrl}/checkout?edit=shipping`}
        role="button"
        className="text-primary pointer-events-auto absolute text-sm underline max-md:col-span-1 md:col-span-2"
        style={{
          top: '1.5rem',
          right: '1.5rem',
        }}
      >
        Edit
      </a>
    </div>
  );
};
