import { noop } from 'lodash';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { preventDefault } from '@bigcommerce/checkout/dom-utils';
import { TranslatedString, withCurrency, WithCurrencyProps } from '@bigcommerce/checkout/locale';
import { useCheckout, useParentContext } from '@bigcommerce/checkout/payment-integration-api';

import { CheckboxInput } from '../../ui/form';
import { Tooltip, TooltipTrigger } from '../../ui/tooltip';



export interface StoreCreditFieldProps {
    availableStoreCredit: number;
    name: string;
    usableStoreCredit: number;
    isStoreCreditApplied: boolean;
    onChange?(value: boolean): void;
}

const StoreCreditField: FunctionComponent<StoreCreditFieldProps & WithCurrencyProps> = ({
    availableStoreCredit,
    currency,
    name,
    onChange = noop,
    usableStoreCredit,
    isStoreCreditApplied,
}) => {
    const {
        checkoutState: {
            statuses: { isSubmittingOrder }
        }
    } = useCheckout();

    /**
     * `isParent` is derived from a cookie in the checkout bootstrap layer
     * and passed into the embedded checkout runtime via `postMessage`.
     *
     * We intentionally do NOT rely on:
     * - BigCommerce customer groups
     * - Backend lookups
     * - Checkout SDK internals
     *
     * This keeps the logic UI-scoped, predictable, and version-safe.
     */
    const { isParent } = useParentContext();
    console.log("🚀 ~ StoreCreditField ~ isParent:", isParent)

    const handleChange = useCallback((event) => onChange(event.target.checked), [onChange]);
    const labelContent = useMemo(
        () => (
            <>
                <TranslatedString id="redeemable.apply_store_credit_before_action" />{' '}
                <TooltipTrigger
                    placement="top-start"
                    tooltip={
                        <Tooltip testId="payment-store-credit-tooltip">
                            <TranslatedString
                                data={{
                                    storeCredit: currency.toCustomerCurrency(availableStoreCredit),
                                }}
                                id={
                                    isParent
                                        ? 'redeemable.store_credit_available_text_eWallet'
                                        : 'redeemable.store_credit_available_text'
                                }
                            />
                        </Tooltip>
                    }
                >
                    <a href="#" onClick={preventDefault()}>
                        {currency.toCustomerCurrency(usableStoreCredit)}
                    </a>
                </TooltipTrigger>{' '}
                <TranslatedString
                    id={
                        isParent
                            ? 'redeemable.apply_store_credit_after_action_eWallet'
                            : 'redeemable.apply_store_credit_after_action'
                    }
                />
            </>
        ),
        [availableStoreCredit, currency, usableStoreCredit, isParent],
    );

    return (
        <CheckboxInput
            checked={isStoreCreditApplied}
            disabled={isSubmittingOrder()}
            id={name}
            label={labelContent}
            name={name}
            onChange={handleChange}
            value={name}
        />
    );
};

export default withCurrency(StoreCreditField);
