export const TypeMap = {
  bar: {
    en: `Bar`,
    th: `บาร์`
  },
  commercial: {
    en: `Commercial Building`,
    th: `อาคารพาณิชย์ให้เช่า`
  },
  condo: {
    en: `Condo`,
    th: `คอนโด`
  },
  hotel_resort: {
    en: `Hotel Resort`,
    th: `โรงแรม และ รีสอร์ท`
  },
  house: {
    en: `Single House`,
    th: `บ้านเดี่ยว`
  }, 
  land: {
    en: `Land`,
    th: `ที่ดิน`
  },
  office: {
    en: `Office`,
    th: `ออฟฟิศให้เช่า`
  },
  restaurant: {
    en: `Restaurant`,
    th: `ร้านอาหาร`
  },
  townhouse: {
    en: `Townhouse`,
    th: `ทาวน์เฮ้าส์`
  },
  villa: {
    en: `Pool Villa`,
    th: `พูลวิลล่า`
  }, 
} as const;

export const TypeMenu: (keyof typeof TypeMap)[] = [
  `bar`,
  `commercial`,
  `condo`,
  `hotel_resort`,
  `house`, 
  `land`,
  `office`,
  `restaurant`,
  `townhouse`,
  `villa`, 
] as const;