import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, onDelete }) {
  if (!projects.length) {
    return <p>No projects yet.</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDelete={onDelete} />
      ))}
    </div>
  );
}
