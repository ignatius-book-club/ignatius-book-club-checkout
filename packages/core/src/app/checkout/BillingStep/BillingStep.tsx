import { Address } from '@bigcommerce/checkout-sdk';
import React from 'react';
import { AddressDisplay } from '../AddressDisplay/AddressDisplay';
import { ibcUrl } from '../utils/checkout-utils';

type BillingStepProps = {
  address: Address;
};

export const BillingStep = ({ address }: BillingStepProps) => {
  return (
    <div className="relative grid max-md:grid-cols-1 gap-4 md:grid-cols-3 border-light-border opacity-1 border-t py-6 border-b">
      <span className="text-ibc-blue col-span-1 text-2xl font-semibold m-0 capitalize">
        Billing
      </span>
      <div className="col-span-2 flex flex-col gap-4">
        <AddressDisplay
          displayConfig={{
            name: true,
            company: true,
            country: true,
          }}
          address={address}
        />
      </div>
      <a
        href={`${ibcUrl}/checkout?edit=billing`}
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
