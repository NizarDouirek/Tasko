
import { ServiceRequest } from "./types";

// Simulation d'une base de données pour les demandes de service
let serviceRequests: ServiceRequest[] = [
  {
    id: "1",
    userId: "user-1",
    title: "Réparation plomberie",
    description: "Fuite d'eau dans la salle de bain",
    status: "pending",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01")
  },
  {
    id: "2",
    userId: "user-1",
    title: "Installation électrique",
    description: "Installation d'un nouveau tableau électrique",
    status: "accepted",
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-04-26")
  },
  {
    id: "3",
    userId: "user-2",
    title: "Réparation climatisation",
    description: "La climatisation ne refroidit plus",
    status: "rejected",
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-22")
  }
];

// Délai artificiel pour simuler une latence réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const serviceApi = {
  // Récupérer toutes les demandes (admin uniquement)
  getAllRequests: async (): Promise<ServiceRequest[]> => {
    await delay(500);
    return [...serviceRequests];
  },

  // Récupérer les demandes d'un utilisateur
  getUserRequests: async (userId: string): Promise<ServiceRequest[]> => {
    await delay(500);
    return serviceRequests.filter(request => request.userId === userId);
  },

  // Créer une nouvelle demande
  createRequest: async (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<ServiceRequest> => {
    await delay(500);
    const newRequest: ServiceRequest = {
      id: `request-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...request
    };
    serviceRequests.push(newRequest);
    return newRequest;
  },

  // Mettre à jour une demande
  updateRequest: async (request: Partial<ServiceRequest> & { id: string }): Promise<ServiceRequest> => {
    await delay(500);
    const index = serviceRequests.findIndex(r => r.id === request.id);
    if (index === -1) {
      throw new Error("Demande non trouvée");
    }
    
    serviceRequests[index] = {
      ...serviceRequests[index],
      ...request,
      updatedAt: new Date()
    };
    
    return serviceRequests[index];
  },

  // Supprimer une demande
  deleteRequest: async (id: string): Promise<void> => {
    await delay(500);
    const index = serviceRequests.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error("Demande non trouvée");
    }
    serviceRequests.splice(index, 1);
  },

  // Changer le statut d'une demande (admin uniquement)
  updateRequestStatus: async (id: string, status: "pending" | "accepted" | "rejected"): Promise<ServiceRequest> => {
    await delay(500);
    const index = serviceRequests.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error("Demande non trouvée");
    }
    
    serviceRequests[index] = {
      ...serviceRequests[index],
      status,
      updatedAt: new Date()
    };
    
    return serviceRequests[index];
  }
};
