import { useContext } from "react";
import { AutheContext } from "./AutheContext";

export function useAuth(){
    const ctx = useContext(AutheContext)
    if(!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}