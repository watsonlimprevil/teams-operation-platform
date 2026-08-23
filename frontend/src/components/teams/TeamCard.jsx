export default function TeamCard({ team }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>{team.name}</h3>
      <p>Team ID: {team.id}</p>
    </div>
  );
}
