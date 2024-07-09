import classNames from 'classnames';
import React, { FunctionComponent, memo, ReactNode } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';

import { Button, ButtonSize, ButtonVariant } from '../ui/button';
import { IconCheck } from '../ui/icon';

import CheckoutStepType from './CheckoutStepType';

export interface CheckoutStepHeaderProps {
  heading: ReactNode;
  isActive?: boolean;
  isComplete?: boolean;
  isEditable?: boolean;
  summary?: ReactNode;
  type: CheckoutStepType;
  onEdit?(type: CheckoutStepType): void;
}

const CheckoutStepHeader: FunctionComponent<CheckoutStepHeaderProps> = ({
  heading,
  isActive,
  isComplete,
  onEdit,
  summary,
  type,
}) => {
  return (
    <div
      // className={classNames('stepHeader', {
      //   'is-readonly': !isEditable,
      //   'is-clickable': isEditable && !isActive,
      // })}
      className='stepHeader is-clickable'
      onClick={() => {
        onEdit?.(type)
      }}
      // onClick={preventDefault(isEditable && onEdit ? () => onEdit(type) : noop)}
    >
      <div className="stepHeader-figure stepHeader-column">
        {/* <IconCheck
          additionalClassName={classNames('stepHeader-counter', 'optimizedCheckout-step', {
            'stepHeader-counter--complete': isComplete,
          })}
        /> */}

        <h2 className="stepHeader-title optimizedCheckout-headingPrimary">{heading}</h2>
      </div>

      <div
        className="stepHeader-body stepHeader-column optimizedCheckout-contentPrimary"
        data-test="step-info"
      >
        {!isActive && isComplete && summary}
      </div>

      {/* {isEditable && !isActive && ( */}
      <div className="stepHeader-actions stepHeader-column">
        <Button
          aria-expanded={isActive}
          size={ButtonSize.Tiny}
          testId="step-edit-button"
          variant={ButtonVariant.Secondary}
          className='text-ibc-blue bg-transparent'
        >
          <TranslatedString id="common.edit_action" />
        </Button>
      </div>
      {/* )} */}
    </div>
  );
};

export default memo(CheckoutStepHeader);
