import { useState } from "react";

export default function RenameProjectModal({ renamed,  onRename , setShowRename}){
    const [renaming , setRenaming]= useState('')
    return(
        <div 
        key={renamed.id}
        >
            <input 
            placeholder={renamed.name}
            value={renaming}
            onChange={e => setRenaming(e.target.value)}
            />
            <button onClick={()=>onRename(renamed.id , renaming) }>Rename</button>
            <button onClick={()=>setShowRename(false) }>Cancel</button>
        </div>
    )
}