
import { LoginCredentials, RegisterData, Task, User } from "./types";

// Simulate local storage persistence
const USERS_KEY = "task-master-users";
const TASKS_KEY = "task-master-tasks";
const CURRENT_USER_KEY = "task-master-current-user";

// Initialize mock data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(TASKS_KEY)) {
    localStorage.setItem(TASKS_KEY, JSON.stringify([]));
  }
};

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  register: async (data: RegisterData): Promise<User> => {
    initializeStorage();
    await delay(500); // Simulate network delay
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    
    // Check if email already exists
    if (users.some((user: User) => user.email === data.email)) {
      throw new Error("Cet email est déjà utilisé");
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username: data.username,
      email: data.email
    };
    
    // Save user
    users.push({...newUser, password: data.password});
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Set as current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return newUser;
  },
  
  login: async (credentials: LoginCredentials): Promise<User> => {
    initializeStorage();
    await delay(500); // Simulate network delay
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }
    
    const userData: User = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    // Set as current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    
    return userData;
  },
  
  logout: async (): Promise<void> => {
    await delay(200); // Simulate network delay
    localStorage.removeItem(CURRENT_USER_KEY);
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    await delay(300); // Simulate network delay
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
};

// Tasks API
export const tasksApi = {
  getTasks: async (userId: string): Promise<Task[]> => {
    initializeStorage();
    await delay(500); // Simulate network delay
    
    const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
    const userTasks = allTasks
      .filter((task: Task) => task.userId === userId)
      .map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    
    return userTasks;
  },
  
  addTask: async (userId: string, title: string): Promise<Task> => {
    initializeStorage();
    await delay(300); // Simulate network delay
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      userId,
      title,
      completed: false,
      createdAt: new Date()
    };
    
    const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
    allTasks.push(newTask);
    localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
    
    return newTask;
  },
  
  updateTask: async (taskId: string, updates: Partial<Task>): Promise<Task> => {
    initializeStorage();
    await delay(300); // Simulate network delay
    
    const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
    const taskIndex = allTasks.findIndex((t: Task) => t.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error("Tâche non trouvée");
    }
    
    const updatedTask = {
      ...allTasks[taskIndex],
      ...updates,
      createdAt: allTasks[taskIndex].createdAt // Preserve original date
    };
    
    allTasks[taskIndex] = updatedTask;
    localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
    
    return {
      ...updatedTask,
      createdAt: new Date(updatedTask.createdAt)
    };
  },
  
  deleteTask: async (taskId: string): Promise<void> => {
    initializeStorage();
    await delay(300); // Simulate network delay
    
    const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
    const filteredTasks = allTasks.filter((t: Task) => t.id !== taskId);
    
    if (filteredTasks.length === allTasks.length) {
      throw new Error("Tâche non trouvée");
    }
    
    localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
  }
};
