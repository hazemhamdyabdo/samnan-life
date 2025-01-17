interface AddressResponse {
  status: number;
  response_code: string;
  message: string;
  data: AddressData;
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
  name: string;
  city_id: number | string | null;
  district_id: number | null;
  street: string;
  latitude?: number | null;
  longitude?: number | null;
  national_address: string;
  details?: string;
}

interface CitiesResponse {
  status: number;
  response_code: string;
  message: string;
  data: City[];
}

interface City {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  name: string;
}

interface DistrictsResponse {
  status: number;
  response_code: string;
  message: string;
  data: District[];
}

interface District {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  city_name: string;
  city: City;
}



export type { AddressResponse, AddressData, Address, City, CitiesResponse, DistrictsResponse, District };