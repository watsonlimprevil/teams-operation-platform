
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import TaskColumn from "../components/tasks/TaskColumn";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [projectId]);

  async function fetchProject() {
    try {
      const res = await api.get(`/projects/${projectId}`);
      setProject(res.data);
    } catch (error) {
      console.error("Error loading project", error);
    }
  }

  async function fetchTasks() {
    try {
      const res = await api.get(`/tasks/projects/${projectId}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error loading tasks", error);
    }
  }

  async function handleMoveTask(id, newStatus) {
    try {
      await api.put(`/tasks/${id}/status`, { status: newStatus });

      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Error moving task", error);
    }
  }

  async function handleRenameTask(id, newTitle) {
    try {
      await api.put(`/tasks/${id}/rename`, { title: newTitle });

      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, title: newTitle } : t))
      );
    } catch (error) {
      console.error("Error renaming task", error);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);

      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }

  async function handleCreateTask(data) {
    try {
      const res = await api.post(`/tasks/kanban`, data);

      setTasks(prev => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  // Split tasks into columns
  const pending = tasks.filter(t => t.status === "pending");
  const inProgress = tasks.filter(t => t.status === "in-progress");
  const done = tasks.filter(t => t.status === "done");

  if (!project) return <p>Loading project...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{project.name}</h1>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <TaskColumn
          title="Pending"
          tasks={pending}
          onMove={handleMoveTask}
          onRename={handleRenameTask}
          onDelete={handleDeleteTask}
        />

        <TaskColumn
          title="In Progress"
          tasks={inProgress}
          onMove={handleMoveTask}
          onRename={handleRenameTask}
          onDelete={handleDeleteTask}
        />

        <TaskColumn
          title="Done"
          tasks={done}
          onMove={handleMoveTask}
          onRename={handleRenameTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
}
