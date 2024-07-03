export const OptionMap = {
  rental_price: {
    en: `Rental`,
    th: `เช่า`
  },
  price: {
    en: `Sell`,
    th: `ขาย`
  }
} as const;

export const OptionMenu: (keyof typeof OptionMap)[] = [
  `price`, 
  `rental_price`
] as const;