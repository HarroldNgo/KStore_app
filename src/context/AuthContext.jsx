import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";


export const AuthContext = createContext(false)

export function AuthProvider({children}){

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")
    const [superuser, setSuperuser] = useState(false)

    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if(expiry_date >= current_time){
                setIsAuthenticated(true)
            }
        }
    }


    function get_username(){
        api.get("get_username")
        .then(res => {
            setUsername(res.data.username)
        })

        .catch(err => {
            console.log(err.message)
        })
    }
    function is_superuser(){
        if (isAuthenticated) {
            api.get("is_superuser")
            .then(res => {
                setSuperuser(res.data.is_superuser);
            })
            .catch(err => {
                console.log(err.message);
            });
        }
    }


    useEffect(() => {
        handleAuth()
        get_username()
        is_superuser()
    }, [isAuthenticated])

    const authValue = {isAuthenticated, username, setIsAuthenticated, get_username, superuser}


    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}