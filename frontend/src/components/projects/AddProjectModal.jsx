import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AddProjectModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    try {
      const res = await api.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.log("Error loading teams");
    }
  }

  async function handleCreate() {
    try {
      const res = await api.post("/projects", { name, teamId: Number(teamId) });
      onCreated(res.data);
    } catch (err) {
      console.log("Error creating project");
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2>Create Project</h2>

      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <select
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        style={{ padding: "0.5rem", width: "200px" }}
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={handleCreate}>Create</button>
      <button onClick={onClose} style={{ marginLeft: "1rem" }}>
        Cancel
      </button>
    </div>
  );
}
