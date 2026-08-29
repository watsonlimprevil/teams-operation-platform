import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import AddProjectModal from "../components/projects/AddProjectModal";
import { useCallback } from "react";
export default function TeamDetails() {
  const { teamId } = useParams();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showProjectModal , setShowProjectModal] = useState(false)

const fetchTeamDetails = useCallback(async () => {
  try {
    const res = await api.get(`/teams/${teamId}`);
    setTeam(res.data.team);
    setMembers(res.data.members);
    setProjects(res.data.projects);
  } catch (err) {
    console.log("Error loading team details");
  }
}, [teamId]);


  useEffect(() => {
    fetchTeamDetails();
  }, [teamId]);

  if (!team) {
    return <p style={{ padding: "2rem" }}>Loading team...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{team.name}</h1>

      <hr />

      <h2>Members</h2>
      {members.map(m => (
        <div key={m.userId}>
          {m.user.name} — {m.role}
        </div>
      ))}

      <hr />

      <h2>Projects</h2>
      {projects.map(p => (
        <div key={p.id}>
          {p.name}
        </div>
      ))}
      <button onClick={()=> setShowProjectModal(true)}> 
        Create Project
      </button>
      {showProjectModal && (
        <AddProjectModal 
        teamId={teamId}
        onClose={()=> setShowProjectModal(false)}
        onCreated={fetchTeamDetails}
        />
      )}
    </div>
  );
}
