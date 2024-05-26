import { LanguageType } from '@/_constants/locale';

export const format_bedroom = (num: number, locale: LanguageType = `en`) => {
  const studio = Object.is(locale, `en`) ? `Studio` : `สตูดิโอ`;
  return num === 0 ? studio : num;
}