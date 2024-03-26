import { PropertyModel } from './'

export type PropertyCardModel = {
  card: PropertyModel;
  display_amenities: (e: any, amenities_list: string[]) => void
}