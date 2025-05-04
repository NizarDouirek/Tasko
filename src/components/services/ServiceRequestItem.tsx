
import React from 'react';
import { ServiceRequest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, CheckCircle, XCircle, Pencil, Trash, FileText } from 'lucide-react';

interface ServiceRequestItemProps {
  request: ServiceRequest;
  onEdit?: (request: ServiceRequest) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: "pending" | "accepted" | "rejected") => void;
}

export function ServiceRequestItem({ 
  request, 
  onEdit, 
  onDelete,
  onStatusChange
}: ServiceRequestItemProps) {
  const { isAdmin, user } = useAuth();
  const isOwner = user?.id === request.userId;
  const isPending = request.status === "pending";
  
  const statusIcons = {
    pending: <Clock className="status-icon status-pending" />,
    accepted: <CheckCircle className="status-icon status-accepted" />,
    rejected: <XCircle className="status-icon status-rejected" />
  };
  
  const statusLabels = {
    pending: "En attente",
    accepted: "Acceptée",
    rejected: "Refusée"
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="service-request-item">
      <div className="service-request-header">
        <h3 className="service-request-title">{request.title}</h3>
        <div className="service-request-status">
          {statusIcons[request.status]}
          <span className={`status-text status-${request.status}`}>
            {statusLabels[request.status]}
          </span>
        </div>
      </div>
      
      <div className="service-request-description">
        {request.description}
      </div>
      
      {request.attachment && (
        <div className="service-request-attachment">
          <FileText className="attachment-icon" />
          <a href={request.attachment} target="_blank" rel="noopener noreferrer">
            Voir la pièce jointe
          </a>
        </div>
      )}
      
      <div className="service-request-date">
        Créée le {formatDate(request.createdAt)}
        {request.createdAt.toString() !== request.updatedAt.toString() && 
          ` - Mise à jour le ${formatDate(request.updatedAt)}`
        }
      </div>
      
      <div className="service-request-actions">
        {isOwner && isPending && onEdit && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(request)}
            className="action-button"
          >
            <Pencil className="action-icon" />
            Modifier
          </Button>
        )}
        
        {(isOwner || isAdmin()) && onDelete && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(request.id)}
            className="action-button"
          >
            <Trash className="action-icon" />
            Supprimer
          </Button>
        )}
        
        {isAdmin() && isPending && onStatusChange && (
          <>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onStatusChange(request.id, "accepted")}
              className="action-button"
            >
              <CheckCircle className="action-icon" />
              Accepter
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onStatusChange(request.id, "rejected")}
              className="action-button"
            >
              <XCircle className="action-icon" />
              Refuser
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
