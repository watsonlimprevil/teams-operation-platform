import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error("Error loading profile");
    }
  }

  if (!user) {
    return <div style={{ padding: "2rem" }}>Loading profile...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Profile</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2>{user.name}</h2>
        <p>Email : {user.email}</p>
        <p>User ID : {user.id}</p>
        <p>Role : {user.role}</p>
      </div>

      <h2>Your Stats</h2>
      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Projects:</strong>
          {user.projects.length || 0}
        </p>
        <p>
          <strong>Tasks:</strong>
          {user.tasks.length || 0}
        </p>
        <p>
          <strong>Teams:</strong>
          {user.memberships.length || 0}
        </p>
      </div>

      <h2 style={{ marginTop: "2rem" }}>Your Teams</h2>
      {user.memberships?.length === 0 && <p>You are not part of any teams</p>}
      {user.memberships?.map((m) => (
        <div key={m.team.id} style={{ marginTop: "1rem" }}>
          <strong>{m.team.name}</strong> - {m.role}
        </div>
      ))}
      <h2 style={{ marginTop: "2rem" }}>Your Projects</h2>
      {user.projects?.length === 0 && <p>No Projects yet.</p>}
      {user.projects?.map((p) => (
        <div key={p.id} style={{ marginTop: "1rem" }}>
          <strong>{p.name}</strong>
        </div>
      ))}

      <h2 style={{ marginTop: "2rem" }}>Your Tasks</h2>
      {user.tasks?.length === 0 && <p>No Tasks yer.</p>}
      {user.tasks?.map((t) => (
        <div key={t.id} style={{ marginTop: "1rem" }}>
          <strong>{t.title}</strong> - {t.status}
        </div>
      ))}
    </div>
  );
}
