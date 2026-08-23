import useAuth from "../hooks/useAuth";

export default function Dashboard(){
    const { logout } = useAuth();

    return(
        <div style={{padding : '2rem'}}>
            <h2>Dashboard</h2>

            <p>Welcom to your Team Operations Platform</p>

            <button onClick={logout}>Logout</button>
        </div>
    )
}