import { Login } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {


    if(localStorage.getItem('token')){
        return children
    }else{
        return <Navigate to={'/'}/>
    }
}

export default ProtectedRoute