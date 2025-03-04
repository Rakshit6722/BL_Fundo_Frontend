import { Login } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    
    const navigate = useNavigate()

    const[token,setToken] = useState(localStorage.getItem("token"))

    useEffect(()=>{
        if(!token){
            navigate('/')
        }
    },[token,navigate])

    return token ? children : <Login/>
}

export default ProtectedRoute