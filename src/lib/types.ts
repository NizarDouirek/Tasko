
export interface User {
  id: string;
  username: string;
  email: string;
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

export interface Task {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
