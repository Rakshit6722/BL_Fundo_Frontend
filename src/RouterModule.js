import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'

const RouterModule = () => {

    const routes = createBrowserRouter([
        {
            path:'',
            element:<Login/>
        },
        {
            path:'register',
            element:<Register/>
        },
    ])

  return (
    <RouterProvider router={routes}/>
  )
}

export default RouterModule
