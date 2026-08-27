import { useParams } from "react-router-dom";
export default function TeamDetails(){
    const {teamId} = useParams();

    return(
        <div style={{padding : '2rem'}}>
            <h1>Team Details</h1>
            <p>Team ID : {teamId}</p>
            <p>we'll show members and projects here later.</p>
        </div>
    );
}