import { PropertyModel } from '@/_models';
import { LanguageToggleMap } from "@/_constants/locale";

export const route_edit = (property: PropertyModel, language: keyof typeof LanguageToggleMap): string => {
  return `/${language}/form?edit=true&id=${property.id}`;
}