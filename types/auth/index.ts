interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  otp: string;
  authorized: number;
  activated: number;
  created_at: string;
  updated_at: string;
}
interface UserRegistrationDetails {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  confirm_password: string;
}

export type {
  Customer,
  UserRegistrationDetails
}