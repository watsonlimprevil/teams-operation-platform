import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function TaskDetails() {
  const { taskId } = useParams();
  const Navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  async function fetchTask() {
    try {
      const res = await api.get(`/tasks/${taskId}`);
      setTask(res.data);
      setNewTitle(res.data.title);
      setNewStatus(res.data.status);
      setLoading(false);
    } catch (error) {
      console.error("Error loading task", err);
      setLoading(false);
    }
  }

  async function handleRename() {
    try {
      await api.put(`/tasks/${taskId}`, { title: newTitle });
      setTask((prev) => ({ ...prev, title: newTitle }));
    } catch (err) {
      console.error("error renaming tasks", err);
    }
  }
  async function handleStatusChange() {
    try {
      await api.put(`/tasks/${taskId}/status`, { status: newStatus });
      setTask((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Error updating status", error);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/tasks/${taskId}`);
      Navigate("/tasks");
    } catch (err) {
      console.error("Error deletting task", err);
    }
  }
  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading task...</p>;
  }

  if (!task) {
    return <p style={{ padding: "2rem" }}>Task not found.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Task Details</h1>
      <button onClick={() => Navigate("/tasks")}>Back to Tasks</button>
      <hr />

      <h2>{task.title}</h2>
      <p>
        Status: <strong>{task.status}</strong>
      </p>
      {task.projectId && (
        <p>
          Project:{""}
          <button onClick={() => Navigate(`/projects/${task.projectId}`)}>
            View Project
          </button>
        </p>
      )}

      {task.teamId && (
        <p>
          Team :{" "}
          <button onClick={() => Navigate(`/teams/${task.teamId}`)}>
            View Team
          </button>
        </p>
      )}
      <hr />
      <h3>Rename Task</h3>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={handleRename} style={{ marginLeft: "1rem" }}>
        Save
      </button>

      <hr />
      <h3>Chnage Status</h3>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        style={{ padding: "0.5rem" }}
      >
        <option value={"pending"}>Pending</option>
        <option value={"in-progress"}>In Progress</option>
        <option value={"done"}>Done</option>
      </select>
      <button onClick={handleStatusChange} style={{ marginLeft: "1rem" }}>
        Update
      </button>

      <hr />

      <h3>Danger Zone</h3>
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "white", padding: "0.5rem" }}
      >
        Delete Task
      </button>
    </div>
  );
}
