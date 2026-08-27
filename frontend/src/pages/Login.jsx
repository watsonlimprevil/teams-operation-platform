import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');
    const nav = useNavigate();
    async function handleLogin(){
        try{
            const res = await api.post('/auth/login' , {
                email,
                password,
            });

            localStorage.setItem('token', res.data.token);

            nav('/dashboard')
        }catch(error){
            setError('Invalid email or password')
        }
    };

    return(
        <div style={{ padding : '2rem'}}>
            <h1>Login</h1>
            {error && <p style={{ color : 'red'}}>{error}</p>}

            <input 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <br></br>

            <input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <br></br>

            <button onClick={handleLogin}>Login</button>
            <button onClick={()=> nav('/register')}>Dont have a account</button>
        </div>
    )
}