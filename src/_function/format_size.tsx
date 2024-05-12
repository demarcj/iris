import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export const format_size = (size: string = ``): string => {
  return `${new Intl.NumberFormat(`en-US`).format(parseInt(`${size}`))} sqm`;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumericSizeFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
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
        allowLeadingZeros={false}
        allowNegative={false}
        valueIsNumericString
        suffix=' sqm'
      />
    );
  },
);