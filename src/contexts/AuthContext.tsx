
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { User, AuthState } from "@/lib/types";
import { authApi } from "@/lib/mockApi";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: "LOGIN_START" | "REGISTER_START" | "LOGOUT_START" }
  | { type: "LOGIN_SUCCESS" | "REGISTER_SUCCESS"; payload: User }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "LOGOUT_SUCCESS" }
  | { type: "LOAD_USER"; payload: User | null };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
    case "LOGOUT_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    case "LOAD_USER":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await authApi.getCurrentUser();
        dispatch({ type: "LOAD_USER", payload: user });
      } catch (error) {
        dispatch({ type: "AUTH_FAILURE", payload: "Échec du chargement de l'utilisateur" });
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = await authApi.login({ email, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.username} !`,
      });
    } catch (error: any) {
      dispatch({ type: "AUTH_FAILURE", payload: error.message });
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
      });
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    dispatch({ type: "REGISTER_START" });
    try {
      const user = await authApi.register({
        username,
        email,
        password,
        confirmPassword: password,
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: user });
      toast({
        title: "Inscription réussie",
        description: `Bienvenue, ${user.username} !`,
      });
    } catch (error: any) {
      dispatch({ type: "AUTH_FAILURE", payload: error.message });
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
      });
      throw error;
    }
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT_START" });
    try {
      await authApi.logout();
      dispatch({ type: "LOGOUT_SUCCESS" });
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  const isAdmin = () => {
    return state.user?.role === "admin";
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
