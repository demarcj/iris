export const LanguageToggleMap = {
  en: {
    code: `en`,
    cap: `EN`,
    translate: `English`
  },
  th: {
    code: `th`,
    cap: `TH`,
    translate: `ไทย`
  }
} as const;

export const LanguageList: (keyof typeof LanguageToggleMap)[] = [`en`, `th`] as const;