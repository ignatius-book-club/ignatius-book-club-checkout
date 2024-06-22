import { PhysicalItem } from '@bigcommerce/checkout-sdk';
import React from 'react';
import { OrderSummaryItemProps } from './OrderSummaryItem';

function mapFromPhysical(item: PhysicalItem): OrderSummaryItemProps {
  return {
    id: item.id,
    quantity: item.quantity,
    amount: item.extendedComparisonPrice,
    amountAfterDiscount: item.extendedSalePrice,
    name: item.name,
    image: item.imageUrl && (
      <img
        className="rounded-sm object-contain object-center"
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          inset: '0px',
          color: 'transparent',
        }}
        alt={item.name}
        data-test="cart-item-image"
        src={item.imageUrl}
      />
    ),
    description: item.giftWrapping ? item.giftWrapping.name : undefined,
    productOptions: (item.options || []).map((option) => ({
      testId: 'cart-item-product-option',
      content: `${option.name} ${option.value}`,
    })),
  };
}

export default mapFromPhysical;
