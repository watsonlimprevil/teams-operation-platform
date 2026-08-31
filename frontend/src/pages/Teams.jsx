import { useEffect, useState } from "react";
import api from "../api/axios";
import TeamList from "../components/teams/TeamList";
import AddTeamModal from "../components/teams/AddTeamModal";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function fetchTeams() {
    try {
      const res = await api.get("/teams"); // ⭐ Correct
      setTeams(res.data);
    } catch (err) {
      console.log("Error fetching teams", err);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teams</h1>

      <button onClick={() => setShowModal(true)}>Create Team</button>

      <TeamList teams={teams} />

      {showModal && (
        <AddTeamModal
          onClose={() => setShowModal(false)}
          onCreated={fetchTeams}
        />
      )}
    </div>
  );
}
