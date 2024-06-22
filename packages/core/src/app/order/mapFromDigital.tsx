import { DigitalItem } from '@bigcommerce/checkout-sdk';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import React from 'react';
import { OrderSummaryItemOption, OrderSummaryItemProps } from './OrderSummaryItem';

function mapFromDigital(item: DigitalItem): OrderSummaryItemProps {
  return {
    id: item.id,
    quantity: item.quantity,
    amount: item.extendedListPrice,
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
    productOptions: [
      ...(item.options || []).map((option) => ({
        testId: 'cart-item-product-option',
        content: `${option.name} ${option.value}`,
      })),
      getDigitalItemDescription(item),
    ],
  };
}

function getDigitalItemDescription(item: DigitalItem): OrderSummaryItemOption {
  if (!item.downloadPageUrl) {
    return {
      testId: 'cart-item-digital-product',
      content: <TranslatedString id="cart.digital_item_text" />,
    };
  }

  return {
    testId: 'cart-item-digital-product-download',
    content: (
      <a href={item.downloadPageUrl} rel="noopener noreferrer" target="_blank">
        <TranslatedString id="cart.downloads_action" />
      </a>
    ),
  };
}

export default mapFromDigital;
