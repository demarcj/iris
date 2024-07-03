import { LanguageToggleMap } from '@/_constants/locale';

export interface PreferenceModel {
  language: keyof typeof LanguageToggleMap;
}