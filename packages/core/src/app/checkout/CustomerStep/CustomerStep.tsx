import React from 'react';

type CustomerStepProps = {
  email: string | undefined;
};

export const CustomerStep = ({ email }: CustomerStepProps) => {
  return (
    <div className="border-light-border opacity-1 border-t py-6 grid max-md:grid-cols-1 gap-4 md:grid-cols-3 items-center">
      <span className="text-ibc-blue col-span-1 text-2xl font-semibold m-0 capitalize">
        Customer
      </span>
      <span className="col-span-2 text-ibc-blue text-base">{email}</span>
    </div>
  );
};
