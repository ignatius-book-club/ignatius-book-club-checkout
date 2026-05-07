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
    // The Next.js storefront propagates ibc_newCheckoutId / ibc_isParent on
    // the BigCommerce SSO URL because cross-domain cookie writes from
    // ignatiusbookclub.com to .ignatiusbookfairs.com are silently dropped by
    // the browser. They're carried in the URL fragment (not the query string)
    // because BC's /cart.php?action=loadInCheckout server-side redirect to
    // /checkout strips unknown query params, but per RFC 7231 §7.1.2 the
    // fragment is preserved across 302s when the Location has no fragment of
    // its own. Mirror them into cookies here — before CheckoutApp is required
    // and the React tree mounts — so existing readers (useCookies in
    // CheckoutApp.tsx) pick them up unchanged. Search is kept as a fallback
    // for paths where BC happens to preserve query params.
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));

        // eslint-disable-next-line no-console
        console.log('🚀 ~ renderCheckout ~ ibc params:', {
            search: window.location.search,
            hash: window.location.hash,
            ibc_newCheckoutId: hashParams.get('ibc_newCheckoutId') ?? searchParams.get('ibc_newCheckoutId'),
            ibc_isParent: hashParams.get('ibc_isParent') ?? searchParams.get('ibc_isParent'),
        });

        (['ibc_newCheckoutId', 'ibc_isParent'] as const).forEach((name) => {
            const value = hashParams.get(name) ?? searchParams.get(name);

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
