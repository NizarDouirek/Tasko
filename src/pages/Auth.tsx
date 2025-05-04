
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isLoginPath = location.pathname === "/auth/login";
  const isRegisterPath = location.pathname === "/auth/register";
  
  // Default to login if path doesn't match any expected path
  const defaultTab = isRegisterPath ? "register" : "login";

  const handleTabChange = (value: string) => {
    navigate(`/auth/${value}`);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLoginPath ? "Connexion" : "Créer un compte"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
