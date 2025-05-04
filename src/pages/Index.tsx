
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, FileText, Users, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  return (
    <Layout>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-icon">
            <div className="hero-icon-circle">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="hero-title">
            MonService.ma
          </h1>

          <p className="hero-description">
            Plateforme simple et intuitive pour gérer vos demandes de service
          </p>

          <div className="hero-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/register">
                  <button className="btn btn-default btn-lg">
                    S'inscrire
                  </button>
                </Link>
                <Link to="/auth/login">
                  <button className="btn btn-outline btn-lg">
                    Se connecter
                  </button>
                </Link>
              </>
            ) : (
              <Link to={isAdmin() ? "/admin" : "/dashboard"}>
                <button className="btn btn-default btn-lg">
                  Accéder à mon espace
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="features">
          <h2 className="features-title">Fonctionnalités</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FileText />
              </div>
              <h3 className="feature-title">Demandes de service</h3>
              <p className="feature-description">
                Créez et suivez vos demandes de service facilement
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle />
              </div>
              <h3 className="feature-title">Suivi de statut</h3>
              <p className="feature-description">
                Suivez l'état de vos demandes en temps réel
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3 className="feature-title">Espace utilisateur</h3>
              <p className="feature-description">
                Gérez votre profil et vos demandes à un seul endroit
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <ShieldCheck />
              </div>
              <h3 className="feature-title">Administration</h3>
              <p className="feature-description">
                Panel d'administration pour gérer les demandes et utilisateurs
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
