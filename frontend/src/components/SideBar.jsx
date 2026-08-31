import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        width: collapsed ? "70px" : "220px",
        background: "#f5f5f5",
        padding: "1rem",
        height: "50vh",
        borderRight: "1px solid #ddd",
        transition: "width 0.2s ease",
      }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          marginBottom: "1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {!collapsed && <h3>TeamOps</h3>}

      <nav
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Link to="/dashboard">{collapsed ? "🏠" : "Dashboard"}</Link>
        <Link to="/teams">{collapsed ? "👥" : "Teams"}</Link>
        <Link to="/projects">{collapsed ? "📁" : "Projects"}</Link>
        <Link to="/tasks">{collapsed ? "📝" : "Tasks"}</Link>
        <Link to={"/profile"}>{collapsed ? "👤" : "profile"}</Link>
      </nav>
    </div>
  );
}
