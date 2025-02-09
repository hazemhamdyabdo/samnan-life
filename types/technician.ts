interface Technician {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  otp: string | null;
  authorized: number;
  activated: number;
  rating: number;
  reviews_count: number;
  manager_id: number;
  created_at: string;
  updated_at: string;
  districts?: District[];
  products?: Product[];
}

interface District {
  id: number;
  name: string;
  city_name: string;
  pivot: {
    technician_id: number;
    district_id: number;
  };
  city: {
    id: number;
    name: string;
  };
}

interface Product {
  id: number;
  sap_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  category_name: string;
  image_url: string;
  pivot: {
    technician_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
  };
  category: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
  };
}

interface RequestStatus {
  id: number;
  maintenance_request_id: number;
  status: string;
  latitude: string | null;
  longitude: string | null;
  notes: string | null;
  current: number;
  created_at: string;
  updated_at: string;
}

interface MaintenanceRequest {
  id: number;
  customer_id: number;
  technician_id: number;
  slot_id: number;
  type: string;
  address_id: number;
  sap_order_id: string | null;
  problem_description: string | null;
  invoice_number: string | null;
  photos: string[];
  last_maintenance_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  current_status: RequestStatus;
  customer: null;
  technician: Technician;
  address: Address;
  products: Product[];
  statuses: RequestStatus[];
  invoice?: Invoice;
  slot: Slot
}

interface Address {
  id: number;
  customer_id: number;
  name: string;
  city_id: number;
  district_id: number;
  street: string;
  national_address: string;
  details: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
}
interface Slot {
  id: number;
  technician_id: number;
  date: string;
  time: string;
  is_booked: number;
  created_at: string;
  updated_at: string;
}

interface Invoice {
  id: number;
  maintenance_request_id: number;
  total: number;
  payment_method: string;
  status: string;
  payment_details: null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  services: Service[];
  spare_parts: SparePart[];
}

interface Service {
  id: number;
  image: string;
  is_active: number;
  price: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  image_url: string;
  pivot: ServicePivot;
}

interface ServicePivot {
  invoice_id: number;
  service_id: number;
}

interface SparePart {
  id: number;
  sap_id: string;
  price: number;
  stock: number;
  image_url: string;
  name: string;
  description: string;
  pivot: SparePartPivot;
}

interface SparePartPivot {
  invoice_id: number;
  spare_part_id: number;
  quantity: number;
  price: string;
}
interface RequestsByType {
  type: string;
  count: number;
  current_status: string | null;
}

interface RequestsByStatus {
  status: string;
  count: number;
}

interface AllRequests {
  current_page: number;
  data: MaintenanceRequest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface TechnicianResponse {
  status: number;
  response_code: string;
  message: string;
  data: {
    technician: Technician;
    total_requests: number;
    requests_by_type: RequestsByType[];
    requests_by_status: RequestsByStatus[];
    completed_requests: number;
    ongoing_requests: number;
    next_request: null;
    all_requests: AllRequests;
  };
}

interface AllRequestsResponse {
  status: number;
  response_code: string;
  message: string;
  data: MaintenanceRequestData;
}
interface MaintenanceRequestData {
  current_page: number;
  data: MaintenanceRequest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface InvoiceInterface {
  id: number
  invoice_number: string | null;
  customerName: string | null | any;
  productName: string;
  type: string;
  address: Address;
  time: string;
  date: string;
  status: string | undefined;
  service: { name: string; price: number }[] | undefined;
  payment_method: string | undefined;
  total: number | undefined;
}

export type { TechnicianResponse, Product, District, Technician, MaintenanceRequest, RequestsByType, RequestsByStatus, AllRequests, RequestStatus, AllRequestsResponse, InvoiceInterface };