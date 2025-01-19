export type MaintainTypes =
  | "new_installation"
  | "regular_maintenance"
  | "emergency_maintenance";

export interface CreateRequest {
  type: MaintainTypes;
  products: number[] | null;
  problem_description?: string;
  last_maintenance_date?: string;
  address_id: number | null;
  photo: File[];
}
