
import React from "react";
import { Task } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskItemProps) {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => 
              onToggleComplete(task.id, checked === true)
            }
            className="h-5 w-5"
          />
          <span 
            className={cn(
              "text-lg transition-opacity", 
              task.completed && "line-through opacity-70"
            )}
          >
            {task.title}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Modifier</span>
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Supprimer</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
