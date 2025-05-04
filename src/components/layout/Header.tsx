
import React from "react";
import { LogOut, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-logo">
          <CheckCircle className="header-logo-icon" />
          <Link to="/">Task Master</Link>
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
