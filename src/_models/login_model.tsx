import { LanguageType } from "@/_constants/locale"

export interface LoginModel {
  created_at?: Date | string;
  device?: string;
  id?: string;
  last_login?: Date | string;
  location?: string;
  password: string;
  preferred_language?: LanguageType; 
  role?: string;
  updated_at?: Date | string;
  user_name: string;
}