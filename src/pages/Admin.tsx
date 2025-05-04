
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/lib/types';
import { authApi } from '@/lib/mockApi';
import { serviceApi } from '@/lib/mockServiceApi';
import { ServiceRequestList } from '@/components/services/ServiceRequestList';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [activeTab, setActiveTab] = useState("requests");
  
  // Rediriger si l'utilisateur n'est pas admin
  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Charger la liste des utilisateurs
  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const data = await authApi.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des utilisateurs"
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };
  
  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    }
  }, [activeTab]);
  
  // Gestion de la suppression de demande
  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      return;
    }
    
    try {
      await serviceApi.deleteRequest(id);
      
      toast({
        title: "Succès",
        description: "La demande a été supprimée avec succès"
      });
      
      // Recharger les demandes
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de supprimer la demande"
      });
    }
  };
  
  // Gestion du changement de statut
  const handleStatusChange = async (id: string, status: "pending" | "accepted" | "rejected") => {
    try {
      await serviceApi.updateRequestStatus(id, status);
      
      toast({
        title: "Succès",
        description: `Le statut de la demande a été changé à "${status === 'accepted' ? 'Acceptée' : 'Refusée'}"`
      });
      
      // Recharger les demandes
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de changer le statut de la demande"
      });
    }
  };

  return (
    <Layout requiresAuth={true}>
      <div className="admin-container">
        <h1 className="admin-title">Administration</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="admin-tabs">
            <TabsTrigger value="requests">Demandes de service</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests" className="admin-tab-content">
            <h2 className="admin-section-title">Gestion des demandes de service</h2>
            <ServiceRequestList
              requests={[]} // Ces données seront chargées dans le composant Dashboard importé
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
          
          <TabsContent value="users" className="admin-tab-content">
            <h2 className="admin-section-title">Liste des utilisateurs</h2>
            
            {isLoadingUsers ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Chargement des utilisateurs...</p>
              </div>
            ) : (
              <div className="users-list">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom d'utilisateur</th>
                      <th>Email</th>
                      <th>Rôle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role === "admin" ? "Administrateur" : "Utilisateur"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
