import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * ParentContext
 *
 * Holds cross-frame UI state that must be shared between the
 * checkout bootstrap (parent app) and the embedded checkout runtime.
 *
 * NOTE:
 * We intentionally use `window.postMessage` instead of
 * `createEmbeddedCheckoutMessenger` from `@bigcommerce/checkout-sdk`.
 *
 * Reason:
 * - The SDK messenger API is not stable or documented in v1.621.x
 * - It is designed for BigCommerce-controlled storefronts
 * - Our checkout is embedded inside a custom Next.js app
 * - `postMessage` is the browser-native, version-proof transport
 *   that BigCommerce itself relies on internally
 */
type ParentContextValue = {
    isParent: boolean;
};

const ParentContext = createContext<ParentContextValue>({
    isParent: false,
});

/**
 * ParentProvider
 *
 * Listens for cross-frame messages sent from the checkout bootstrap
 * layer (where cookies are accessible) and exposes the derived state
 * to the checkout runtime via React Context.
 *
 * Expected message shape:
 * {
 *   type: 'IBC_IS_PARENT',
 *   payload: { isParent: boolean }
 * }
 */
export const ParentProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isParent, setIsParent] = useState(false);

    useEffect(() => {
        /**
         * Message handler for cross-frame communication.
         *
         * We intentionally avoid SDK helpers here to:
         * - prevent SDK version coupling
         * - avoid undocumented APIs
         * - keep behavior predictable across upgrades
         */
        const handler = (event: MessageEvent) => {
            const { type, payload } = event.data || {};

            if (type === 'IBC_IS_PARENT') {
                setIsParent(Boolean(payload?.isParent));
            }
        };

        window.addEventListener('message', handler);

        return () => {
            window.removeEventListener('message', handler);
        };
    }, []);

    return (
        <ParentContext.Provider value={{ isParent }}>
            {children}
        </ParentContext.Provider>
    );
};

/**
 * useParentContext
 *
 * Consumer hook for checkout components that need to know
 * whether the current flow is a Parent (eWallet) flow.
 */
export const useParentContext = () => useContext(ParentContext);
