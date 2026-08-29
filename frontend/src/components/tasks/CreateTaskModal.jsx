import { useState } from "react";

export default function CreateTaskModal({onClose , onCreate , projectId , teamId}){
    const [title, setTitle] = useState('');
    const [description , setDescription] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        if(!title.trim()) return;

        onCreate({
            title,
            description,
            status: 'pending',
            projectId,
            teamId
        });
        onClose()
    }

    return(
        <div
        style={{
            position : 'fixed',
            top:0,
            left:0,
            width: '100vw',
            height : '100vh',
            background: 'rgba(0,0,0,0.5)',
            display : 'flex',
            justifyContent: 'center',
            alignItems : 'center'
        }}
        >
            <div
            style={{
                background : 'white',
                padding : '2rem',
                borderRadius : '8px',
                width : '400px'
            }}
            >
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{width : '100%' , marginBottom:'1rem'}}
                    />
                    <label>Description </label>
                    <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{width:'100%' , marginBottom:'1rem'}}
                    />
                    <button type="submit">Create</button>
                    <button type="button" onClick={onClose} style={{marginLeft:'1rem'}}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}