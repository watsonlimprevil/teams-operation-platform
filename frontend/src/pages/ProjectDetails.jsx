import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import TaskColumn from "../components/tasks/TaskColumn";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import RenameTaskModal from "../components/tasks/RenameTaskModal";

import { DragDropContext } from "@hello-pangea/dnd";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);

  // Columns stored separately for reordering
  const [columns, setColumns] = useState({
    pending: [],
    "in-progress": [],
    done: []
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [renameTask, setRenameTask] = useState(null);

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [projectId]);

  async function fetchProject() {
    try {
      const res = await api.get(`/projects/${projectId}`);
      setProject(res.data);
    } catch (error) {
      console.error("Error loading project", error);
    }
  }

  async function fetchTasks() {
    try {
      const res = await api.get(`/tasks/projects/${projectId}`);

      const pending = res.data.filter(t => t.status === "pending");
      const inProgress = res.data.filter(t => t.status === "in-progress");
      const done = res.data.filter(t => t.status === "done");

      setColumns({
        pending,
        "in-progress": inProgress,
        done
      });
    } catch (error) {
      console.error("Error loading tasks", error);
    }
  }

async function handleMoveTask(id, newStatus) {
  try {
    await api.put(`/tasks/${id}/status`, { status: newStatus });

    // Update UI immediately
    setColumns(prev => {
      const updated = { ...prev };

      // Remove task from all columns
      for (const col in updated) {
        updated[col] = updated[col].filter(t => t.id !== id);
      }

      // Find the moved task from previous state
      const allTasks = [
        ...prev.pending,
        ...prev["in-progress"],
        ...prev.done
      ];

      const movedTask = allTasks.find(t => t.id === id);

      if (movedTask) {
        movedTask.status = newStatus;
        updated[newStatus].push(movedTask);
      }

      return updated;
    });
  } catch (error) {
    console.error("Error moving task", error);
  }
}



  async function handleRenameTask(id, newTitle) {
    try {
      await api.put(`/tasks/${id}`, { title: newTitle });

      setColumns(prev => {
        const updated = { ...prev };

        for (const col in updated) {
          updated[col] = updated[col].map(t =>
            t.id === id ? { ...t, title: newTitle } : t
          );
        }

        return updated;
      });
    } catch (error) {
      console.error("Error renaming task", error);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);

      setColumns(prev => {
        const updated = { ...prev };

        for (const col in updated) {
          updated[col] = updated[col].filter(t => t.id !== id);
        }

        return updated;
      });
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }

  async function handleCreateTask(data) {
    try {
      const res = await api.post(`/tasks/kanban`, data);

      setColumns(prev => ({
        ...prev,
        pending: [...prev.pending, res.data]
      }));
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  // DRAG AND DROP HANDLER
  function handleDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    // Reordering inside same column
    if (sourceCol === destCol) {
      const column = Array.from(columns[sourceCol]);
      const [moved] = column.splice(source.index, 1);
      column.splice(destination.index, 0, moved);

      setColumns(prev => ({
        ...prev,
        [sourceCol]: column
      }));

      return;
    }

    // Moving between columns
    const sourceTasks = Array.from(columns[sourceCol]);
    const destTasks = Array.from(columns[destCol]);

    const [moved] = sourceTasks.splice(source.index, 1);
    moved.status = destCol; // update status locally

    destTasks.splice(destination.index, 0, moved);

    setColumns(prev => ({
      ...prev,
      [sourceCol]: sourceTasks,
      [destCol]: destTasks
    }));

    // Update backend
    handleMoveTask(Number(draggableId), destCol);
  }

  if (!project) return <p>Loading project...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{project.name}</h1>

      <button onClick={() => setShowCreateModal(true)}>
        + Add Task
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          <TaskColumn
            title="Pending"
            columnId="pending"
            tasks={columns.pending}
            onMove={handleMoveTask}
            onRename={task => setRenameTask(task)}
            onDelete={handleDeleteTask}
          />

          <TaskColumn
            title="In Progress"
            columnId="in-progress"
            tasks={columns["in-progress"]}
            onMove={handleMoveTask}
            onRename={task => setRenameTask(task)}
            onDelete={handleDeleteTask}
          />

          <TaskColumn
            title="Done"
            columnId="done"
            tasks={columns.done}
            onMove={handleMoveTask}
            onRename={task => setRenameTask(task)}
            onDelete={handleDeleteTask}
          />
        </div>
      </DragDropContext>

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTask}
          projectId={projectId}
          teamId={project.teamId}
        />
      )}

      {renameTask && (
        <RenameTaskModal
          task={renameTask}
          onRename={handleRenameTask}
          onClose={() => setRenameTask(null)}
        />
      )}
    </div>
  );
}
