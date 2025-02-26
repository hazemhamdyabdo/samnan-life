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

interface TranslatedStep {
  step_icon: string;
  step_title: string;
  step_description: string;
}

interface TranslatedService {
  service_title: string;
  service_description: string;
}


interface LandingData {
  id: number;
  store_url: string;
  app_store_url: string;
  google_play_url: string;
  social: string | null;
  created_at: string;
  updated_at: string;
  main_title: string;
  main_description: string;
  feature_title: string;
  feature_description: string;
  store_title: string;
  store_description: string;
  download_title: string;
  translated_steps: TranslatedStep[];
  translated_services: TranslatedService[];
  main_image_url: string;
  logo_url: string;
  feature_image_url: string;
  services_image_url: string;
  store_image_url: string;
  map_image_url: string;
  download_image_url: string;
  translated_rights: string | null;
}

interface Category {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

interface SupportForm {
  user_id: string;
  subject: string;
  details: string;
  user_type: "technician" | "customer";
  platform: "app" | "web";
}


export type { ApiResponse, AddressData, Address, City, District, Product, CustomerData, UpdateProfileRequest, ChangePasswordRequest, Slider, LandingData, Category, SupportForm };