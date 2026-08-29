import { useEffect , useState } from "react";
import { AutheContext } from "./AutheContext";
import { login, register, logout, getMe } from "../services/auth.service";

export function AuthProvider({children}){
    const [user , setUser] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        async function loadUser(){
            try{
                const res = await getMe();
                if(res.user) setUser(res.user)
            }catch(err){
        console.log('Not logged in')
            }
            setLoading(false)
        }
        loadUser();
    },[]);

    async function handleLogin(email, password){
        const res = await login(email, password);
        if(res.user) setUser(res.user);
    }

    async function handleRegister(name , email , password){
        await register(name , email , password)
    };

    async function handleLogout(){
        await logout();
        setUser(null)
    }

    return(
        <AutheContext.Provider
        value={{
            user,
            loading,
            login: handleLogin,
            register: handleRegister,
            logout: handleLogout
        }}
        >
            {children}
        </AutheContext.Provider>
    )
}