import { useState } from "react";
import api from "../../api/axios";

export default function AddProjectModal({ onClose, onCreate, teamId }) {
  const [name, setName] = useState('');

  async function handleCreate() {
    try {
      await api.post('/projects', { name, teamId: Number(teamId) });
      onCreate();
      onClose();
    } catch (error) {
      console.log('Error creating project', error);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'white',
        padding: '2rem',
        border: '1px solid #ccc'
      }}
    >
      <h2>Create Project</h2>

      <input
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
