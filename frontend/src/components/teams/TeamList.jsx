import { Link } from "react-router-dom";

export default function TeamList({ teams }) {
  return (
    <div>
      {teams.map(team => (
        <div key={team.id} style={{ marginBottom: "1rem" }}>
          <h3>{team.name}</h3>
          <p>Team ID: {team.id}</p>

          <Link to={`/teams/${team.id}`}>
            View Team
          </Link>
        </div>
      ))}
    </div>
  );
}
