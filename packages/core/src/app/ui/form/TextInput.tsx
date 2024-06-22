import React, { forwardRef, Ref } from 'react';

import Input, { InputProps } from './Input';

export interface TextInputProps extends InputProps {
  additionalClassName?: string;
  appearFocused?: boolean;
  type?: 'text' | 'password' | 'tel' | 'email' | 'number';
  isFloatingLabelEnabled?: boolean;
}

const TextInput = forwardRef(
  (
    {
      additionalClassName,
      isFloatingLabelEnabled,
      appearFocused,
      type = 'text',
      ...rest
    }: TextInputProps,
    ref: Ref<HTMLInputElement>,
  ) => (
    <Input
      {...rest}
      // className={classNames(
      //     'form-input',
      //     'optimizedCheckout-form-input',
      //     { 'form-input--focus': appearFocused },
      //     { 'optimizedCheckout-form-input--focus': appearFocused },
      //     additionalClassName,
      // )}
      className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none h-full text-base focus:placeholder:opacity-0 border-light-border border p-2 rounded-medium"
      isFloatingLabelEnabled={isFloatingLabelEnabled}
      ref={ref}
      type={type}
    />
  ),
);

export default TextInput;
