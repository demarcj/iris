export const TransferFeesMap = {
  on_buyer: {
    en: `On Buyer`,
    th: `ชำระโดยผู้ซื้อ`
  },
  on_owner: {
    en: `On Owner`,
    th: `ชำระโดยผู้ขาย`
  },
  share_50_50: {
    en: `Share 50/50`,
    th: `ชำระคนละครึ่ง`
  }
} as const;

export const TransferFeesMenu: (keyof typeof TransferFeesMap)[] = [
  `on_buyer`, 
  `on_owner`, 
  `share_50_50`
] as const;