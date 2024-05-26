export const OptionMap = {
  rental_price: {
    en: `Rental`,
    th: `เช่า`
  },
  price: {
    en: `Sell`,
    th: `ขาย`
  }
}

export const OptionMenu: (keyof typeof OptionMap)[] = [
  `price`, 
  `rental_price`
];