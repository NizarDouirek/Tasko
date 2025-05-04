
import React from "react";
import { Task } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Pencil } from "lucide-react";

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
    <div className="card task-item">
      <div className="task-item-content">
        <div className="task-item-left">
          <div className="checkbox-container">
            <input
              type="checkbox"
              className={`checkbox ${task.completed ? "checkbox-checked" : ""}`}
              checked={task.completed}
              onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            />
          </div>
          <span 
            className={`task-title ${task.completed ? "task-title-completed" : ""}`}
          >
            {task.title}
          </span>
        </div>

        <div className="task-item-actions">
          <button 
            className="btn btn-outline btn-icon task-action-btn"
            onClick={() => onEdit(task)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Modifier</span>
          </button>
          <button 
            className="btn btn-destructive btn-icon task-action-btn"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
