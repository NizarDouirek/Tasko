
import React from 'react';
import { ServiceRequest } from '@/lib/types';
import { ServiceRequestItem } from './ServiceRequestItem';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ServiceRequestListProps {
  requests: ServiceRequest[];
  onEdit?: (request: ServiceRequest) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: "pending" | "accepted" | "rejected") => void;
  isLoading?: boolean;
}

export function ServiceRequestList({ 
  requests, 
  onEdit, 
  onDelete,
  onStatusChange,
  isLoading = false 
}: ServiceRequestListProps) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des demandes...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <Alert>
        <AlertTitle>Aucune demande trouvée</AlertTitle>
        <AlertDescription>
          Vous n'avez pas encore de demandes de service. Créez-en une nouvelle !
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="service-request-list">
      {requests.map(request => (
        <ServiceRequestItem 
          key={request.id}
          request={request}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
