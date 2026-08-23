import TeamCard from "./TeamCard";

export default function TeamList({ teams }) {
  if (!teams.length) {
    return <p>No teams yet.</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
