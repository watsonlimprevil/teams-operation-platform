import { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();

  const [data, setData] = useState({
    teams: [],
    projects: [],
    tasks: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard load error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <p>Welcome to your Team Operations Platform</p>

      <button onClick={logout}>Logout</button>

      <hr />

      <h3>Your Teams</h3>
      {data.teams.length === 0 && <p>You are not part of any teams yet.</p>}
      {data.teams.map((membership) => (
        <div key={membership.teamId}>
          <strong>{membership.team.name}</strong> — Role: {membership.role}
        </div>
      ))}

      <hr />

      <h3>Your Projects</h3>
      {data.projects.length === 0 && <p>No projects yet.</p>}
      {data.projects.map((project) => (
        <div key={project.id}>
          <strong>{project.name}</strong>
        </div>
      ))}

      <hr />

      <h3>Your Tasks</h3>
      {data.tasks.length === 0 && <p>No tasks yet.</p>}
      {data.tasks.map((task) => (
        <div key={task.id}>
          <strong>{task.title}</strong> — {task.status}
        </div>
      ))}
    </div>
  );
}
