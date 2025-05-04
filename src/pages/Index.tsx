
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, List, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Gérez vos tâches simplement
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Une application simple et intuitive pour gérer vos tâches quotidiennes. 
            Créez, organisez et suivez vos tâches en toute simplicité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="px-8">
                Commencer
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="lg" variant="outline" className="px-8">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 max-w-5xl w-full">
          <h2 className="text-2xl font-bold mb-10 text-center">Fonctionnalités</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <List className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gestion de tâches</h3>
              <p className="text-muted-foreground">
                Créez, modifiez et supprimez facilement vos tâches.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Suivi de progression</h3>
              <p className="text-muted-foreground">
                Marquez les tâches comme terminées et suivez votre progression.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comptes utilisateurs</h3>
              <p className="text-muted-foreground">
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
