
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Store {
  id: string;
  name: string;
  logo?: string;
  website: string;
  description?: string;
}

export interface Coupon {
  id: string;
  store_id: string;
  code: string;
  description: string;
  discount_value?: string;
  expiry_date?: string;
  terms?: string;
  success_rate?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
