import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import AddProjectModal from "../components/projects/AddProjectModal";
import RenameProjectModal from "./RenameProject";
import { Link } from "react-router-dom";
export default function TeamDetails() {
  const { teamId } = useParams();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showRenameModal , setShowRenameModal] = useState(false);
  const [renamed , setRenamed]= useState(null);
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
  }, [fetchTeamDetails]);

  if (!team) {
    return <p style={{ padding: "2rem" }}>Loading team...</p>;
  }

  async function deleteProjects(id){
    try{
       await api.delete(`/projects/${id}`)
       setProjects(prev => prev.filter(p=> p.id !==id))
    }catch(error){
      console.error('failed to delete project')
    }
  }

  async function renameProject(id , title){
    try{
      const res = await api.put(`/projects/${id}` ,{name: title});
      setProjects(prev => 
        prev.map(p => (p.id ===id ? res.data : p) )
      )
      setShowRenameModal(false)
    }catch(error){
      console.error('unable to rename project', error)
    }
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
          <Link to={`/projects/${p.id}`} style={{marginRight :'1rem'}}>
          {p.name}
          </Link>
          <button onClick={()=> deleteProjects(p.id)}>🗑️</button>
          <button onClick={()=>{
            setRenamed(p)
            setShowRenameModal(true)
          }}>✏️</button>
        </div>
      ))}
      {showRenameModal && (
        <RenameProjectModal 
        renamed={renamed}
        onRename={renameProject}
        setShowRename={setShowRenameModal}
        />
      )}
      <button onClick={() => setShowProjectModal(true)}>
        Create Project
      </button>

      {showProjectModal && (
        <AddProjectModal
          teamId={Number(teamId)}
          onClose={() => setShowProjectModal(false)}
          onCreate={fetchTeamDetails}
        />
      )}
    </div>
  );
}
