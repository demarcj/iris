import { PropertyModel } from '@/_models'

export const route_edit = (property: PropertyModel): string => {
  return `/form?edit=true&id=${property.id}`;
}