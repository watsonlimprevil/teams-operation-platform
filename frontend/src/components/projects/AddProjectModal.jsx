import { useState } from "react";
import api from "../../api/axios";

export default function AddProjectModal({onClose , onCreate , teamId}){
    const [name , setName] = useState('');

    async function handleCreate(){
        try{
            await api.post('/projects' , {name ,teamId});
            onCreate();
            onClose()
        }catch(error){
            console.log('Error creating projects')
        }
    }

    return(
        <div
        style={{
            position : 'fixed',
            top : '20%',
            left: '50%',
            transform : 'translateX(-50%)',
            background : 'white',
            padding : '2rem',
            borderRadius : '8px',
            boxShadow : '0px 0px 10px rgba(0,0,0,0.2)'
        }}
        >
            <h2>Create Project</h2>

            <input 
            placeholder="Project name"
            value={name}
            onChange={e => setName(e.target.value)}
            />

            <br /><br />

            <button onClick={handleCreate}>Create</button>
            <button onClick={onClose} style={{marginLeft : '1rem'}}>
                Cancel
            </button>
        </div>
    )
}