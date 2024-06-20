import React from 'react';
import { AddressDisplay } from '../AddressDisplay/AddressDisplay';
import { Address } from '@bigcommerce/checkout-sdk';

type BillingStepProps = {
  address: Address;
};

export const BillingStep = ({ address }: BillingStepProps) => {
  return (
    <div className="relative grid max-md:grid-cols-1 gap-4 md:grid-cols-3">
      <span className="text-ibc-blue col-span-1 text-2xl font-semibold">Billing</span>
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
        href={
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3002/checkout?edit=billing'
            : 'https://www.ignatiusbookfairs.com/checkout?edit=billing'
        }
        className="text-primary pointer-events-auto absolute right-0 top-0 text-sm underline max-md:col-span-1 md:col-span-2"
      >
        Edit
      </a>
    </div>
  );
};
