import { Link } from "react-router-dom";

export default function Sidebar(){
    return(
        <div
        style={{
            width : '220px',
            background : '#f5f5f5',
            padding : '1rem',
            height : '100vh',
            borderRight : '1px solid #ddd'
        }}
        >
            <h3>TeamOps</h3>
            <nav style={{marginTop : '2rem' , display :'flex', flexDirection: 'column', gap: '1rem'}}>
                <Link to={'/dashboard'}>Dashboard</Link>
                <Link to={'/teams'}>Teams</Link>
                <Link to={'/projects'}>Projects</Link>
                <Link to={'/tasks'}>Tasks</Link>
            </nav>
        </div>
    )
}