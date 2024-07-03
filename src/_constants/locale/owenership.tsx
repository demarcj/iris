export const OwnershipMap = {
  foreign_quota: {
    en: `Foreign Quota`,
    th: `โควต้าต่างชาติ`
  },
  thai_company_name: {
    en: `Thai Company Name`,
    th: `ชื่อบริษัท`
  },
  thai_quota: {
    en: `Thai Quota`,
    th: `โควต้าไทย`
  }
} as const;

export const OwnershipMenu: (keyof typeof OwnershipMap)[] = [
  `foreign_quota`, 
  `thai_quota`, 
  `thai_company_name`
] as const;