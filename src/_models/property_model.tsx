import { AmenitiesMap, FacilitiesMap, OptionMap, ViewsMap, SubDistrictMap } from "@/_constants/locale"

export interface PropertyModel {
  address: string;
  agent_note?: string;
  amenities: (keyof typeof AmenitiesMap)[];
  allows_marijuana: boolean;
  available_at: string;
  bathrooms: number;
  bedrooms: number;
  building?: string;
  created_at: Date | string;
  description?: string;
  email: string;
  facilities?: (keyof typeof FacilitiesMap)[];
  floor?: number;
  furnished: string;
  hot_deal: boolean;
  id: string;
  images?: string[];
  img: string;
  location: string;
  name: string;
  option: (keyof typeof OptionMap)[];
  ownership: string;
  phone?: string;
  price?: string;
  property_id: string;
  rental_price?: string;
  ref?: string;
  size?: string;
  stories: number;
  sub_district: (keyof typeof SubDistrictMap) | ``;
  transfer_fees: string;
  type: string;
  unit_number?: string;
  updated_at: Date | string;
  useable_area: string;
  views?: (keyof typeof ViewsMap)[];
}