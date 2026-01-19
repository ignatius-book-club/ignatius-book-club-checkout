import { createCheckoutService, createEmbeddedCheckoutMessenger } from '@bigcommerce/checkout-sdk';
import { BrowserOptions } from '@sentry/browser';
import React, { Component, useEffect } from 'react';
import ReactModal from 'react-modal';

import { AnalyticsProvider } from '@bigcommerce/checkout/analytics';
import { ExtensionProvider } from '@bigcommerce/checkout/checkout-extension';
import { ErrorBoundary, ErrorLogger } from '@bigcommerce/checkout/error-handling-utils';
import { getLanguageService, LocaleProvider } from '@bigcommerce/checkout/locale';
import { CheckoutProvider, ParentProvider } from '@bigcommerce/checkout/payment-integration-api';
import { CookiesProvider, useCookies } from 'react-cookie';
import '../../scss/App.scss';

import { createErrorLogger } from '../common/error';
import {
    createEmbeddedCheckoutStylesheet,
    createEmbeddedCheckoutSupport,
} from '../embeddedCheckout';

import Checkout from './Checkout';
import CheckoutNew from './CheckoutNew';


export interface CheckoutAppProps {
    checkoutId: string;
    containerId: string;
    publicPath?: string;
    sentryConfig?: BrowserOptions;
    sentrySampleRate?: number;
    useNewCheckout?: boolean;
}

export default (props: CheckoutAppProps) => {
    return (
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <CheckoutAppWithCookies {...props} />
      </CookiesProvider>
    );

}

const CheckoutAppWithCookies = (props: CheckoutAppProps) => {
  /**
   * Cookies are ONLY accessible at the checkout bootstrap layer.
   * They are NOT accessible inside the embedded checkout runtime
   * due to iframe sandboxing / PCI restrictions.
   */
  const [cookies] = useCookies(['ibc_newCheckoutId', 'ibc_isParent']);
  
  console.log("🚀 ~ CheckoutAppWithCookies ~ cookies:", cookies?.ibc_newCheckoutId, cookies?.ibc_isParent)

  /**
   * Determines whether the current checkout flow is a Parent (eWallet) flow.
   * This value is derived from a cookie set by the parent application.
   */
  
  useEffect(() => {
    /**
     * Guard for SSR safety.
     * This component may be rendered during server-side rendering,
     * but `postMessage` must only run in the browser.
     */
    if (typeof window === 'undefined') {
      return;
    }

    /**
     * Cross-frame communication:
     *
     * We intentionally use browser-native `window.postMessage` instead of
     * `createEmbeddedCheckoutMessenger` from `@bigcommerce/checkout-sdk`.
     *
     * Reason:
     * - The SDK messenger API is not stable or documented in v1.621.x
     * - It is designed for BigCommerce-controlled storefronts
     * - Our checkout is embedded in a custom Next.js application
     *
     * This message is consumed by `ParentProvider` inside the
     * embedded checkout runtime and exposed via React Context.
     *
     * Message payload is intentionally minimal and non-sensitive.
     */
    window.postMessage(
      {
        type: 'IBC_IS_PARENT',
        payload: { isParent: cookies?.ibc_isParent },
      },
      window.location.origin
    );
  }, [cookies?.ibc_isParent]);

  /**
   * `useNewCheckout` is derived from a checkout-scoped cookie
   * and determines which checkout implementation to render.
   */
  return (
    <CheckoutApp
      {...props}
      useNewCheckout={cookies?.ibc_newCheckoutId === props.checkoutId}
    />
  );
};

class CheckoutApp extends Component<CheckoutAppProps> {
    private checkoutService = createCheckoutService({
        locale: getLanguageService().getLocale(),
        shouldWarnMutation: process.env.NODE_ENV === 'development',
    });
    private embeddedStylesheet = createEmbeddedCheckoutStylesheet();
    private embeddedSupport = createEmbeddedCheckoutSupport(getLanguageService());
    private errorLogger: ErrorLogger;

    constructor(props: Readonly<CheckoutAppProps>) {
        super(props);

        this.errorLogger = createErrorLogger(
            { sentry: props.sentryConfig },
            {
                errorTypes: ['UnrecoverableError'],
                publicPath: props.publicPath,
                sampleRate: props.sentrySampleRate ? props.sentrySampleRate : 0.1,
            },
        );
    }

    componentDidMount(): void {
        const { containerId } = this.props;

        ReactModal.setAppElement(`#${containerId}`);
    }

    render() {
        return (
          <ErrorBoundary logger={this.errorLogger}>
            <LocaleProvider checkoutService={this.checkoutService}>
              <CheckoutProvider checkoutService={this.checkoutService}>
                <AnalyticsProvider checkoutService={this.checkoutService}>
                  <ExtensionProvider checkoutService={this.checkoutService}>
                    <ParentProvider>
                    {this.props.useNewCheckout ? (
                      <CheckoutNew
                        {...this.props}
                        createEmbeddedMessenger={createEmbeddedCheckoutMessenger}
                        embeddedStylesheet={this.embeddedStylesheet}
                        embeddedSupport={this.embeddedSupport}
                        errorLogger={this.errorLogger}
                      />
                    ) : (
                      <Checkout
                        {...this.props}
                        createEmbeddedMessenger={createEmbeddedCheckoutMessenger}
                        embeddedStylesheet={this.embeddedStylesheet}
                        embeddedSupport={this.embeddedSupport}
                        errorLogger={this.errorLogger}
                      />
                    )}
                    </ParentProvider>
                  </ExtensionProvider>
                </AnalyticsProvider>
              </CheckoutProvider>
            </LocaleProvider>
          </ErrorBoundary>
        );
    }
}
