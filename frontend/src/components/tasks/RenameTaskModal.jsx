import { useState } from "react";

export default function RenameTaskModal({task , onRename , onClose}){
    const [title , setTitle] = useState(task.title);

    function handleSubmit(e){
        e.preventDefault();
        if(!title.trim()) return;
        onRename(task.id , title);
        onClose();
    }

    return(
        <div 
        style={{
            position : 'fixed',
            top:0,
            left:0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display :'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <div
            style={{
                background : 'white',
                padding : '2rem',
                borderRadius : '8px',
                width: '400px'
            }}
            >
                <h2>Rename Task</h2>
                <form onSubmit={handleSubmit}>
                    <label>New Title</label>
                    <input 
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{width : '100%' , marginBottom : '1rem'}}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}
                    style={{marginLeft : '1rem'}}
                    >Cancel</button>

                </form>

            </div>

        </div>
    )
}