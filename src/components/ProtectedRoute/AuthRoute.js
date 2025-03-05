import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function AuthRoute({children}) {

    if(localStorage.getItem('token')){
        return <Navigate to='/dashboard/notes'/>
    }
    else{
        return children
    }
}

export default AuthRoute
