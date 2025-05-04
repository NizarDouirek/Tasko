
import { User, LoginCredentials, RegisterData } from "./types";

// Simulation d'une base de données pour les utilisateurs
let users: User[] = [
  {
    id: "user-1",
    username: "Jean Dupont",
    email: "user@example.com",
    role: "user"
  },
  {
    id: "user-2",
    username: "Marie Martin",
    email: "marie@example.com",
    role: "user"
  },
  {
    id: "admin-1",
    username: "Admin",
    email: "admin@example.com",
    role: "admin"
  }
];

// Utilisateur actuellement connecté (simulé)
let currentUser: User | null = null;

// Délai artificiel pour simuler une latence réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    await delay(1000); // Simule une latence réseau

    // Dans un cas réel, on vérifierait le mot de passe
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error("Identifiants invalides");
    }

    // Mot de passe pour tests: 
    // - utilisateur standard: "password" pour user@example.com
    // - administrateur: "admin123" pour admin@example.com
    if (
      (credentials.email === "user@example.com" && credentials.password !== "password") ||
      (credentials.email === "admin@example.com" && credentials.password !== "admin123") ||
      (credentials.email === "marie@example.com" && credentials.password !== "password")
    ) {
      throw new Error("Identifiants invalides");
    }

    // Simule la sauvegarde de l'utilisateur en session
    currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));
    
    return user;
  },

  register: async (data: RegisterData): Promise<User> => {
    await delay(1000); // Simule une latence réseau
    
    // Vérifie si l'email existe déjà
    if (users.some(user => user.email === data.email)) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Crée un nouvel utilisateur (avec le rôle "user" par défaut)
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: data.username,
      email: data.email,
      role: "user"
    };
    
    users.push(newUser);
    
    // Simule la sauvegarde de l'utilisateur en session
    currentUser = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
    
    return newUser;
  },

  logout: async (): Promise<void> => {
    await delay(500); // Simule une latence réseau
    currentUser = null;
    localStorage.removeItem("user");
  },

  getCurrentUser: async (): Promise<User | null> => {
    await delay(500); // Simule une latence réseau
    
    // Si un utilisateur est stocké localement, on le récupère
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      currentUser = JSON.parse(storedUser) as User;
    }
    
    return currentUser;
  },

  getAllUsers: async (): Promise<User[]> => {
    await delay(500);
    return [...users];
  }
};
