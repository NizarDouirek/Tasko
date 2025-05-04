
import React, { useState, useEffect } from "react";
import { Task } from "@/lib/types";
import { tasksApi } from "@/lib/mockApi";
import { useAuth } from "@/contexts/AuthContext";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function TaskList() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userTasks = await tasksApi.getTasks(user.id);
      setTasks(userTasks);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les tâches",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleAddTask = async (title: string) => {
    if (!user) return;
    
    try {
      if (editingTask) {
        const updatedTask = await tasksApi.updateTask(editingTask.id, { title });
        setTasks(tasks.map(task => (task.id === editingTask.id ? updatedTask : task)));
        setEditingTask(null);
        toast({
          title: "Tâche mise à jour",
          description: "La tâche a été modifiée avec succès",
        });
      } else {
        const newTask = await tasksApi.addTask(user.id, title);
        setTasks([...tasks, newTask]);
        toast({
          title: "Tâche ajoutée",
          description: "La tâche a été ajoutée avec succès",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
      });
    }
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await tasksApi.updateTask(taskId, { completed });
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
      
      toast({
        title: completed ? "Tâche terminée" : "Tâche réactivée",
        description: completed
          ? "La tâche a été marquée comme terminée"
          : "La tâche a été marquée comme non terminée",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await tasksApi.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      toast({
        title: "Tâche supprimée",
        description: "La tâche a été supprimée avec succès",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Ajouter une tâche</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm
            onSubmit={handleAddTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4">Mes tâches ({tasks.length})</h2>
        
        {isLoading ? (
          <div className="text-center p-6">Chargement des tâches...</div>
        ) : tasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <CheckCircle className="mx-auto h-12 w-12 mb-4 text-primary/40" />
              <p>Aucune tâche pour le moment. Ajoutez-en une !</p>
            </CardContent>
          </Card>
        ) : (
          <div>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
