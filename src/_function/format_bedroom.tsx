import { LanguageToggleMap } from '@/_constants/locale';

export const format_bedroom = (num: number, locale: keyof typeof LanguageToggleMap = `en`) => {
  const studio = Object.is(locale, `en`) ? `Studio` : `สตูดิโอ`;
  return num === 0 ? studio : num;
}