import { useState } from "react";
import { useAuth } from "../components/auth/useAuth";

export default function Register(){
    const { register } = useAuth();
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        await register(name , email , password)
    };

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