import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function Register(){
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    const nav = useNavigate()

    async function handleRegister(){
        try{
            const res = await api.post('/auth/register',{
                email , password,
            });

            setSuccess('Account created successfully. You can now log in');
           

            setError('')
        }catch(error){
        setError('Registration failed. Try a different email.')
        setSuccess('')
        }
    };

    return(
        <div style={{padding : '2rem'}}>
            <h1>Register</h1>
            {error && <p style={{color : 'red'}}>{error}</p>}

            {success && <div> 
                <p style={{color : 'green'}}>{success}</p>
                <button onClick={() => nav('/')}>Login</button>
                </div>}

            <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
              <br /><br />

              <input 
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />

              <br /><br />

              <button onClick={handleRegister}>Create Account</button>

        </div>
    )

}