export type PropertyModel = {
  address: string;
  amenities: string[];
  area?: string[];
  available_at: string;
  bathrooms: number;
  bedrooms: number;
  created_at: Date | string;
  description?: string;
  email: string;
  hot_deal: boolean;
  id: string;
  images?: string[];
  img: string;
  name: string;
  option?: string;
  phone?: string;
  price: number;
  property_id: string;
  size?: number;
  type: string;
  updated_at: Date | string;
  unit_number?: string;
}