import { Address } from '@bigcommerce/checkout-sdk';
import React from 'react';
import { AddressDisplay } from '../AddressDisplay/AddressDisplay';
import { ibcUrl } from '../utils/checkout-utils';

type ShippingStepProps = {
  address: Address;
};

export const ShippingStep = ({ address }: ShippingStepProps) => {
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

        {/* {consignment?.selectedShippingOption?.entityId && (
          <span className="border-light-border text-ibc-blue border-t pt-4">
            {consignment?.selectedShippingOption?.description}:{' '}
            <PriceDisplay amount={consignment.selectedShippingOption.cost?.value} />
          </span>
        )} */}
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
