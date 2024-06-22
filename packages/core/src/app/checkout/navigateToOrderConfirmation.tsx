import { noop } from 'lodash';
import { ibcUrl } from './utils/checkout-utils';

export default function navigateToOrderConfirmation(orderId?: number): Promise<never> {
  window.location.replace(`${ibcUrl}/order-confirmation/${orderId}`);
  return new Promise(noop);

  // let url: string;

  // if (orderId && isBuyNowCart()) {
  //     url = `/checkout/order-confirmation/${orderId.toString()}`;
  // } else {
  //     url = `${window.location.pathname.replace(/\/$/, '')}/order-confirmation`;
  // }

  // window.location.replace(url);

  // return new Promise(noop);
}
