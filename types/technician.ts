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
  districts: District[];
  products: Product[];
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
  address: {
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
  };
  products: Product[];
  statuses: RequestStatus[];
  slot: {
    id: number;
    technician_id: number;
    date: string;
    time: string;
    is_booked: number;
    created_at: string;
    updated_at: string;
  };
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

export type { TechnicianResponse, Product, District, Technician, MaintenanceRequest, RequestsByType, RequestsByStatus, AllRequests, RequestStatus };