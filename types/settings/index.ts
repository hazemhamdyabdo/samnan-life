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


export type { AddressResponse, AddressData };