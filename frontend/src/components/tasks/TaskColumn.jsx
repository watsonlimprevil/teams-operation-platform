import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

export default function TaskColumn({ title, columnId, tasks, onMove, onRename, onDelete }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            width: "300px",
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "8px",
            minHeight: "400px"
          }}
        >
          <h2>{title}</h2>

          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onMove={onMove}
              setRename={onRename}
              onDelete={onDelete}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
