
import React from "react";
import { LogOut, FileText, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-logo">
          <FileText className="header-logo-icon" />
          <Link to="/">MonService.ma</Link>
        </div>
        
        {isAuthenticated ? (
          <div className="header-actions">
            {isAdmin() && (
              <Link to="/admin" className="header-link">
                Administration
              </Link>
            )}
            <Link to="/dashboard" className="header-link">
              Tableau de bord
            </Link>
            <span className="header-welcome">
              <User className="user-icon" />
              <span className="username">{user?.username}</span>
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
