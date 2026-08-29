import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index, onMove, setRename, onDelete }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            background: "white",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ margin: 0 }}>{task.title}</h3>

          {task.description && (
            <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {task.description}
            </p>
          )}

          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {task.status !== "in-progress" && (
              <button onClick={() => onMove(task.id, "in-progress")}>
                Start
              </button>
            )}

            {task.status !== "done" && (
              <button onClick={() => onMove(task.id, "done")}>
                Complete
              </button>
            )}

            {task.status !== "pending" && (
              <button onClick={() => onMove(task.id, "pending")}>
                Reset
              </button>
            )}

            <button onClick={() => setRename(task)}>
              Rename
            </button>

            <button onClick={() => onDelete(task.id)} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

