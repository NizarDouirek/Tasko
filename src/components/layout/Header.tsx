
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold">Task Master</Link>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Bienvenue, {user?.username}
            </span>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Déconnexion</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">Se connecter</Button>
            </Link>
            <Link to="/auth/register">
              <Button size="sm">S'inscrire</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
