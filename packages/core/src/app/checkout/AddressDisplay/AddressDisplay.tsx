import { Address } from '@bigcommerce/checkout-sdk';
import React from 'react';

export type AddressDisplayConfig = {
  name?: boolean;
  email?: boolean;
  address1?: boolean;
  address2?: boolean;
  city?: boolean;
  stateOrProvince?: boolean;
  stateOrProvinceCode?: boolean;
  postalCode?: boolean;
  country?: boolean;
  countryCode?: boolean;
  phone?: boolean;
  company?: boolean;
};

type AddressDisplay = {
  address: Address;
  displayConfig?: AddressDisplayConfig;
  className?: string;
};

const defaultConfig = {
  name: false,
  country: false,
  phone: false,
} as AddressDisplayConfig;

export const AddressDisplay = ({ address, displayConfig = {} }: AddressDisplay) => {
  const finalConfig = { ...defaultConfig, ...displayConfig };

  return (
    <div className="ibc-address-display">
      {finalConfig.name && (
        <span className="ibc-address-name">
          {address?.firstName} {address?.lastName}
        </span>
      )}
      {finalConfig.company && address?.company && <span>{address?.company}</span>}
      <span className="ibc-address1">{address?.address1}</span>
      <span>{address?.address2}</span>
      <span>
        {address?.city}, {address?.stateOrProvince} {address?.postalCode}
      </span>
      {finalConfig.country && <span>{address?.country}</span>}
      {finalConfig.phone && <span>{address?.phone}</span>}
    </div>
  );
};
