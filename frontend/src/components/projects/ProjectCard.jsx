import { Link } from "react-router-dom";

export default function ProjectCard({ project, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
      }}
    >
      <Link to={`/projects/${project.id}`}>
        <h3>{project.name}</h3>
      </Link>

      <p>Project ID: {project.id}</p>
      {project.teamId && <p>Team: {project.teamId}</p>}

      <button
        onClick={() => onDelete(project.id)}
        style={{ marginTop: "1rem" }}
      >
        Delete
      </button>
    </div>
  );
}
