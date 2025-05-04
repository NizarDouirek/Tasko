
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceRequest } from '@/lib/types';
import { serviceApi } from '@/lib/mockServiceApi';
import { ServiceRequestList } from '@/components/services/ServiceRequestList';
import { ServiceRequestForm } from '@/components/services/ServiceRequestForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<ServiceRequest | null>(null);
  
  // Charger les demandes
  const loadRequests = async () => {
    setIsLoading(true);
    try {
      if (!user) return;
      
      // Admin voit toutes les demandes, utilisateur ne voit que les siennes
      const data = isAdmin() 
        ? await serviceApi.getAllRequests() 
        : await serviceApi.getUserRequests(user.id);
      
      setRequests(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les demandes de service"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Charger les demandes au chargement du composant
  useEffect(() => {
    loadRequests();
  }, [user]);
  
  // Gestion de la création de demande
  const handleCreate = async (data: Omit<ServiceRequest, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    
    try {
      await serviceApi.createRequest({
        userId: user.id,
        status: "pending",
        ...data
      });
      
      toast({
        title: "Succès",
        description: "Votre demande a été créée avec succès"
      });
      
      setIsFormOpen(false);
      loadRequests();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de créer la demande"
      });
    }
  };
  
  // Gestion de la modification de demande
  const handleEdit = (request: ServiceRequest) => {
    setCurrentRequest(request);
    setIsFormOpen(true);
  };
  
  const handleUpdate = async (data: Partial<ServiceRequest>) => {
    if (!currentRequest) return;
    
    try {
      await serviceApi.updateRequest({
        id: currentRequest.id,
        ...data
      });
      
      toast({
        title: "Succès",
        description: "Votre demande a été mise à jour avec succès"
      });
      
      setIsFormOpen(false);
      setCurrentRequest(null);
      loadRequests();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour la demande"
      });
    }
  };
  
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
      
      loadRequests();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de supprimer la demande"
      });
    }
  };
  
  // Gestion du changement de statut (admin uniquement)
  const handleStatusChange = async (id: string, status: "pending" | "accepted" | "rejected") => {
    try {
      await serviceApi.updateRequestStatus(id, status);
      
      toast({
        title: "Succès",
        description: `Le statut de la demande a été changé à "${status === 'accepted' ? 'Acceptée' : 'Refusée'}"`
      });
      
      loadRequests();
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
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            {isAdmin() ? "Gestion des demandes" : "Mes demandes de service"}
          </h1>
          
          {!isAdmin() && (
            <Button onClick={() => {
              setCurrentRequest(null);
              setIsFormOpen(true);
            }} className="new-request-button">
              <Plus size={16} />
              Nouvelle demande
            </Button>
          )}
        </div>
        
        <div className="service-requests-container">
          <ServiceRequestList 
            requests={requests}
            onEdit={!isAdmin() ? handleEdit : undefined}
            onDelete={handleDelete}
            onStatusChange={isAdmin() ? handleStatusChange : undefined}
            isLoading={isLoading}
          />
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="service-form-dialog">
            <DialogHeader>
              <DialogTitle>
                {currentRequest ? "Modifier la demande" : "Nouvelle demande"}
              </DialogTitle>
            </DialogHeader>
            <ServiceRequestForm 
              initialData={currentRequest || {}}
              onSubmit={currentRequest ? handleUpdate : handleCreate}
              buttonText={currentRequest ? "Mettre à jour" : "Créer la demande"}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Dashboard;
