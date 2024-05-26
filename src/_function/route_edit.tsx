import { PropertyModel } from '@/_models';
import { LanguageType } from "@/_constants/locale";

export const route_edit = (property: PropertyModel, language: LanguageType): string => {
  return `/${language}/form?edit=true&id=${property.id}`;
}