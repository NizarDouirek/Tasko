
import React from "react";
import { Header } from "./Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
  requiresAuth?: boolean;
}

export function Layout({ children, requiresAuth = false }: LayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  // Redirect if authentication is required but user is not authenticated
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Redirect if user is authenticated but on auth pages
  if (isAuthenticated && location.pathname.startsWith('/auth')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {children || <Outlet />}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Task Master</p>
      </footer>
    </div>
  );
}
