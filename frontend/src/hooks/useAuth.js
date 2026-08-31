import { useContext } from "react";
import { AutheContext } from "../components/auth/AutheContext";

export default function useAuth(){
    return useContext(AutheContext)
}