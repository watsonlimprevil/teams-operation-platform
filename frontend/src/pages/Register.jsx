import { useState } from "react";
import { useAuth } from "../components/auth/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const { register } = useAuth();
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const nav = useNavigate()
  
    console.log("REGISTER FN:", register);

    async function handleSubmit(e) {
    e.preventDefault();

    const res =  await register(name, email, password);
    console.log("RES:", res);

    if (!res) {
        console.log("Registration failed: no response");
        return;
    }

    if (res.ok) {
        nav('/');
    } else {
        console.log("Registration failed:", res.message);
    }
}


    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input 
            placeholder="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />

            <input
            placeholder="Email"
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            />

            <input 
            placeholder="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    )
}