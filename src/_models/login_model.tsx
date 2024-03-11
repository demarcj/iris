export type LoginModel = {
  id?: string;
  created_at?: Date | string;
  last_login?: Date | string;
  password: string;
  role?: string;
  updated_at?: Date | string;
  device?: string;
  user_name: string;
}