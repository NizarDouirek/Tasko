
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Task } from "@/lib/types";

interface TaskFormProps {
  onSubmit: (title: string) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre de la tâche est requis")
    .max(100, "Le titre ne doit pas dépasser 100 caractères"),
});

export function TaskForm({ onSubmit, editingTask, onCancelEdit }: TaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editingTask?.title || "",
    },
  });

  // Update form when editingTask changes
  React.useEffect(() => {
    if (editingTask) {
      form.reset({ title: editingTask.title });
    } else {
      form.reset({ title: "" });
    }
  }, [editingTask, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data.title);
    if (!editingTask) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Ajouter une nouvelle tâche..."
                    className="flex-1"
                    {...field}
                    autoFocus={!!editingTask}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {editingTask ? "Mettre à jour" : "Ajouter"}
          </Button>
          {editingTask && (
            <Button type="button" variant="outline" onClick={onCancelEdit}>
              Annuler
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
