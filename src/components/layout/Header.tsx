
import React from "react";
import { LogOut, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (


    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold">Taskoo</Link>

        </div>
        
        {isAuthenticated ? (
          <div className="header-actions">
            <span className="header-welcome">
              Bienvenue, {user?.username}
            </span>
            <button 
              className="btn btn-ghost btn-sm"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        ) : (
          <div className="header-actions">
            <Link to="/auth/login">
              <button className="btn btn-ghost btn-sm">Se connecter</button>
            </Link>
            <Link to="/auth/register">
              <button className="btn btn-sm btn-default">S'inscrire</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
