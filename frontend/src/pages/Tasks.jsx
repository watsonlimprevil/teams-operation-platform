import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Tasks(){
    const [tasks , setTasks] = useState([]);

    useEffect(()=>{
        fetchTasks()
    },[]);

    async function fetchTasks(){
        try{
            const res = await api.get('/tasks');
            setTasks(res.data);
        }catch(error){
            console.error('Error loading tasks', error)
        }
    }

    async function handleDelete(id){
        try{
            await api.delete(`/tasks/${id}`);
            setTasks(prev =>  prev.filter(t => t.id !==id))
        }catch(error){
            console.error('Error Deleting task', error)
        }
    }

    return(
        <div style={{padding : '2rem'}}>
            <h1>All Tasks</h1>
            {tasks.length === 0 && <p>No Tasks yet.</p>}

            <ul style={{marginTop : '1rem'}}>
                {tasks.map(task => (
                    <li key={task.id} style={{marginBottom: '1rem'}}>
                        <strong>{task.title}</strong> - {task.status}

                        <div style={{marginTop : '0.5rem'}}>
                           <button onClick={() => handleDelete(task.id)} 
                            style={{marginLeft : '1rem'}}
                            >
                                Delete
                           </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )


}