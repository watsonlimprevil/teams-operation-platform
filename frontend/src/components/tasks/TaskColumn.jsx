import TaskCard from "./TaskCard"

export default function TaskColumn({title , tasks , onMove , onRename , onDelete}){
    return(
        <div
        style={{
            width : '300px',
            background : '#f4f4f4',
            padding : '1rem',
            borderRadius : '8px',
            minHeight : '400px'
        }}
        >
            <h2>{title}</h2>
            {tasks.map(task => (
                <TaskCard 
                key={task.id}
                task={task}
                onMove={onMove}
                setRename={onRename}
                onDelete={onDelete}
                />
            ))}
        </div>
    )
}