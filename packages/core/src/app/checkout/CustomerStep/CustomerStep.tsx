import React from 'react';

type CustomerStepProps = {
  email: string | undefined;
};

export const CustomerStep = ({ email }: CustomerStepProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <span className="text-ibc-blue col-span-1 text-2xl font-semibold">Customer</span>
      <span className="col-span-2">{email}</span>
    </div>
  );
};
