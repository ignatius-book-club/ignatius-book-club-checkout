import { Coupon, Fee, GiftCertificate, OrderFee, Tax } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, memo } from 'react';

export interface OrderSummarySubtotalsProps {
  coupons: Coupon[];
  giftCertificates?: GiftCertificate[];
  discountAmount?: number;
  isTaxIncluded?: boolean;
  taxes?: Tax[];
  fees?: Fee[] | OrderFee[];
  giftWrappingAmount?: number;
  isUpdatedCartSummayModal?: boolean;
  shippingAmount?: number;
  handlingAmount?: number;
  storeCreditAmount?: number;
  subtotalAmount: number;
  onRemovedGiftCertificate?(code: string): void;
  onRemovedCoupon?(code: string): void;
}

export const getPriceDisplay = (
  amount: number,
  showZero = true,
  options: Partial<Intl.NumberFormatOptions> = {},
): string => {
  if (!showZero && !amount) {
    return '--';
  }

  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  };
  return `${new Intl.NumberFormat(undefined, {
    ...defaultOptions,
    ...options,
  }).format(amount)}`;
};

type PriceDisplayProps = {
  amount: number;
  className?: string;
  showZero?: boolean;
};

export const PriceDisplay = ({
  amount,
  className = 'text-ibc-blue',
  showZero = true,
}: PriceDisplayProps & React.ComponentProps<'p'>) => (
  <span suppressHydrationWarning={true} className={className}>
    {getPriceDisplay(amount, showZero)}
  </span>
);

const OrderSummarySubtotals: FunctionComponent<OrderSummarySubtotalsProps> = ({
  //   discountAmount,
  //   isTaxIncluded,
  //   giftCertificates,
  taxes,
  //   fees,
  //   giftWrappingAmount,
  shippingAmount,
  subtotalAmount,
  //   handlingAmount,
  //   storeCreditAmount,
  coupons,
  //   onRemovedGiftCertificate,
  //   onRemovedCoupon,
}) => {
  const taxTotal = taxes?.reduce((acc, tax) => acc + tax.amount, 0);

  const hasFreeShippingCoupon = coupons?.find((coupon) => coupon.couponType === 'free_shipping');

  return (
    <>
      <div className="border-light-border text-ibc-blue flex flex-col gap-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>
            <PriceDisplay amount={subtotalAmount} showZero={false} />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>
            <PriceDisplay amount={hasFreeShippingCoupon ? 0 : shippingAmount!} showZero={false} />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Tax</span>
          <span>
            <PriceDisplay amount={taxTotal || 0} showZero={false} />
          </span>
        </div>
      </div>

      {/* <OrderSummaryPrice
        amount={subtotalAmount}
        className="cart-priceItem--subtotal"
        label={<TranslatedString id="cart.subtotal_text" />}
        testId="cart-subtotal"
      />

      {(coupons || []).map((coupon, index) => (
        <OrderSummaryDiscount
          amount={coupon.discountedAmount}
          code={coupon.code}
          key={index}
          label={coupon.displayName}
          onRemoved={onRemovedCoupon}
          testId="cart-coupon"
        />
      ))}

      {!!discountAmount && (
        <OrderSummaryDiscount
          amount={discountAmount}
          label={<TranslatedString id="cart.discount_text" />}
          testId="cart-discount"
        />
      )}

      {(giftCertificates || []).map((giftCertificate, index) => (
        <OrderSummaryDiscount
          amount={giftCertificate.used}
          code={giftCertificate.code}
          key={index}
          label={<TranslatedString id="cart.gift_certificate_text" />}
          onRemoved={onRemovedGiftCertificate}
          remaining={giftCertificate.remaining}
          testId="cart-gift-certificate"
        />
      ))}

      {!!giftWrappingAmount && (
        <OrderSummaryPrice
          amount={giftWrappingAmount}
          label={<TranslatedString id="cart.gift_wrapping_text" />}
          testId="cart-gift-wrapping"
        />
      )}

      <OrderSummaryPrice
        amount={shippingAmount}
        label={<TranslatedString id="cart.shipping_text" />}
        testId="cart-shipping"
        zeroLabel={<TranslatedString id="cart.free_text" />}
      />

      {!!handlingAmount && (
        <OrderSummaryPrice
          amount={handlingAmount}
          label={<TranslatedString id="cart.handling_text" />}
          testId="cart-handling"
        />
      )}

      {fees?.map((fee, index) => (
        <OrderSummaryPrice
          amount={fee.cost}
          key={index}
          label={isOrderFee(fee) ? fee.customerDisplayName : fee.displayName}
          testId="cart-fees"
        />
      ))}

      {!isTaxIncluded &&
        (taxes || []).map((tax, index) => (
          <OrderSummaryPrice amount={tax.amount} key={index} label={tax.name} testId="cart-taxes" />
        ))}

      {!!storeCreditAmount && (
        <OrderSummaryDiscount
          amount={storeCreditAmount}
          label={<TranslatedString id="cart.store_credit_text" />}
          testId="cart-store-credit"
        />
      )} */}
    </>
  );
};

export default memo(OrderSummarySubtotals);
