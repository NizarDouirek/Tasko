
import React from "react";
import { TaskList } from "@/components/tasks/TaskList";
import { Layout } from "@/components/layout/Layout";

const Dashboard = () => {
  return (
    <Layout requiresAuth>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <TaskList />
      </div>
    </Layout>
  );
};

export default Dashboard;
