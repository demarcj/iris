export const FurnishedMap = {
  furnished: {
    en: `Furnished`,
    th: `มีเฟอร์นิเจอร์บางส่วน`
  }, 
  fully_furnished: {
    en: `Fully Furnished`,
    th: `มีเฟอร์นิเจอร์ครบ`
  }, 
  unfurnished: {
    en: `Unfurnished`,
    th: `ไม่มีเฟอร์นิเจอร์`
  }
} as const;

export const FurnishedMenu: (keyof typeof FurnishedMap)[] = [
  `furnished`, 
  `fully_furnished`, 
  `unfurnished`
] as const;