
export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  attachment?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
