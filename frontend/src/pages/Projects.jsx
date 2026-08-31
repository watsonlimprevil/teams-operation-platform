import { useEffect, useState } from "react";
import api from "../api/axios";
import ProjectList from "../components/projects/ProjectList";
import AddProjectModal from "../components/projects/AddProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function fetchProjects() {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Error fetching projects");
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.log("Error deleting project");
    }
  }

  function handleCreated(newProject) {
    setProjects((prev) => [...prev, newProject]);
    setShowModal(false);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Projects</h1>

      <button onClick={() => setShowModal(true)}>Create Project</button>

      <ProjectList projects={projects} onDelete={handleDelete} />

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
