export default function ProjectCard({project}){
    return(
        <div 
        style={{
            border : '1px solid #ccc',
            padding : '1rem',
            marginBottom : '1rem',
            borderRadius: '8px'
        }}
        >
            <h3>{project.name}</h3>
            <p>project ID : {project.id}</p>
            {project.teamId && <p>Team : {project.teamId}</p>}
        </div>
    )
}