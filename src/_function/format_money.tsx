import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const format_money = (price: string = ``) => {
  return new Intl.NumberFormat(
    `th-TH`, 
    {
      style: `currency`, 
      currency: `THB`,
      maximumSignificantDigits: 2
    }
  ).format(parseInt(price));
}

export const NumericMoneyFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        allowNegative={false}
        allowLeadingZeros={false}
        valueIsNumericString
        prefix="฿"
      />
    );
  },
);