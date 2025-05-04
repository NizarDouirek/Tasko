
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, List, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="hero">
        <div className="max-w-3xl mx-auto">
          <div className="hero-icon">
            <div className="hero-icon-circle">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="hero-title">
            Gérez vos tâches simplement
          </h1>

          <p className="hero-description">
            Une application simple et intuitive pour gérer vos tâches quotidiennes. 
            Créez, organisez et suivez vos tâches en toute simplicité.
          </p>

          <div className="hero-actions">
            <Link to="/auth/register">
              <button className="btn btn-default btn-lg">
                Commencer
              </button>
            </Link>
            <Link to="/auth/login">
              <button className="btn btn-outline btn-lg">
                Se connecter
              </button>
            </Link>
          </div>
        </div>

        <div className="features">
          <h2 className="features-title">Fonctionnalités</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <List />
              </div>
              <h3 className="feature-title">Gestion de tâches</h3>
              <p className="feature-description">
                Créez, modifiez et supprimez facilement vos tâches.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle />
              </div>
              <h3 className="feature-title">Suivi de progression</h3>
              <p className="feature-description">
                Marquez les tâches comme terminées et suivez votre progression.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <User />
              </div>
              <h3 className="feature-title">Comptes utilisateurs</h3>
              <p className="feature-description">
                Créez votre compte pour conserver vos tâches en sécurité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
