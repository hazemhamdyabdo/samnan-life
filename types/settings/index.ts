interface ApiResponse<T> {
  status: number;
  response_code: string;
  message: string;
  data: T;
}

interface AddressData {
  customer_id: number;
  name: string;
  city_id: number;
  district_id: number;
  street: string;
  latitude: number;
  longitude: number;
  national_address: string;
  details: string;
  updated_at: string;
  created_at: string;
  id: number;
}

interface Address {
  id?: number;
  name: string;
  city_id: number | string | null;
  district_id: number | null;
  street: string;
  latitude?: number | null;
  longitude?: number | null;
  national_address: string;
  details?: string;
}


interface City {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  name: string;
}

interface District {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  city_name: string;
  city: City;
}


interface Product {
  id: number;
  sap_id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  category_name: string;
  category: Category;
}

interface Category {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}


interface CustomerData {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  otp: string;
  authorized: number;
  activated: number;
  created_at: string;
  updated_at: string;
}


interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  email: string;
}

interface ChangePasswordRequest {
  phone: string;
  current_password: string;
  password: string;
  confirm_password: string;
}
interface Slider {
  id: number;
  link: string;
  created_at: string;
  updated_at: string;
  title: string;
  image_url: string;
}

export type { ApiResponse, AddressData, Address, City, District, Product, CustomerData, UpdateProfileRequest, ChangePasswordRequest, Slider };