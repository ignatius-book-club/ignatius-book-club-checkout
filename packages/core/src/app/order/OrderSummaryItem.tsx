import React, { FunctionComponent, memo, ReactNode } from 'react';

export interface OrderSummaryItemProps {
  id: string | number;
  amount: number;
  quantity: number;
  name: string;
  amountAfterDiscount?: number;
  image?: ReactNode;
  description?: ReactNode;
  productOptions?: OrderSummaryItemOption[];
}

export interface OrderSummaryItemOption {
  testId: string;
  content: ReactNode;
}

const OrderSummaryItem: FunctionComponent<OrderSummaryItemProps> = ({ image, name, quantity }) => (
  <div className="grid grid-cols-3 gap-4" data-test="cart-item">
    <figure className="col-span-1">
      <div className="aspect-w-9 relative aspect-h-12">{image}</div>
    </figure>

    <div className="flex flex-col gap-2 col-span-2">
      <span className="text-ibc-blue w-full font-semibold" data-test="cart-item-product-title">
        {`${quantity} x ${name}`}
      </span>
    </div>
  </div>
);

export default memo(OrderSummaryItem);
