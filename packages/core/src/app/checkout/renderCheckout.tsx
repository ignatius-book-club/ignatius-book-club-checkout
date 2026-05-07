import React from 'react';
import ReactDOM from 'react-dom';

import { configurePublicPath } from '../common/bundler';

import { CheckoutAppProps } from './CheckoutApp';

export type RenderCheckoutOptions = CheckoutAppProps;
export type RenderCheckout = typeof renderCheckout;

export default function renderCheckout({
    containerId,
    publicPath,
    ...props
}: RenderCheckoutOptions): void {
    // The Next.js storefront propagates ibc_newCheckoutId / ibc_isParent as
    // query params on the BigCommerce SSO redirect because cross-domain
    // cookie writes from ignatiusbookclub.com to .ignatiusbookfairs.com are
    // silently dropped by the browser. Mirror them into cookies here — before
    // CheckoutApp is required and the React tree mounts — so existing readers
    // (useCookies in CheckoutApp.tsx) pick them up unchanged. URL params are
    // left in place so a re-init can read them again. No `domain=` attribute:
    // host-scoped is enough since the reader is on the same page, and it keeps
    // the write working on staging / dev hosts too.
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);

        // eslint-disable-next-line no-console
        console.log('🚀 ~ renderCheckout ~ ibc params:', {
            ibc_newCheckoutId: params.get('ibc_newCheckoutId'),
            ibc_isParent: params.get('ibc_isParent'),
            search: window.location.search,
        });

        (['ibc_newCheckoutId', 'ibc_isParent'] as const).forEach((name) => {
            const value = params.get(name);

            if (value !== null) {
                document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
            }
        });
    }

    const configuredPublicPath = configurePublicPath(publicPath);

    // We want to use `require` here because we want to set up the public path
    // first before importing the app component and its dependencies.
    const { default: CheckoutApp } = require('./CheckoutApp');

    // We want to use `require` here because we only want to import the package
    // in development mode.
    if (process.env.NODE_ENV === 'development') {
        const whyDidYouRender = require('@welldone-software/why-did-you-render');

        whyDidYouRender(React, {
            collapseGroups: true,
        });
    }

    ReactDOM.render(
        <CheckoutApp containerId={containerId} publicPath={configuredPublicPath} {...props} />,
        document.getElementById(containerId),
    );
}
