import React from 'react';
import { ibcUrl } from '../utils/checkout-utils';

export const IBCHeader = () => {
  return (
    <div className="bg-ibc-orange ibc-container" style={{ height: '70px' }}>
      <div className="ibc-container-fixed flex h-full items-center justify-between">
        <a href={`${ibcUrl}/cart`} style={{ filter: 'brightness(0) invert(1)' }}>
          <img
            src="https://res.cloudinary.com/dsewycgig/image/upload/v1705889390/ibf_assets/ibf-brightblue_1701195858__78176.original_u75ege.png"
            alt="Ignatius Book Fairs"
            className="rounded-none"
            width="180px"
            height="76px"
          />
        </a>
        <div className="hidden items-center gap-2 md:flex font-brother-1816">
          <a
            className="rounded-md bg-transparent px-4 py-2 uppercase text-white hover:opacity-70"
            href={ibcUrl}
          >
            Book Fairs
          </a>
          <a
            href={ibcUrl}
            className="text-ibc-orange rounded-md bg-transparent bg-white px-4 py-2 uppercase"
          >
            Shop
          </a>
          <a
            className="rounded-md bg-transparent px-4 py-2 uppercase text-white hover:opacity-70"
            href="https://afvapnqh.donorsupport.co/-/XAKURTAP"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
};
