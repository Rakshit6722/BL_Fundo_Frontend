import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import DashboardContainer from './components/DashboardContainer/DashboardContainer'
import NotesContainer from './components/NotesContainer/NotesContainer'
import TrashContainer from './components/TrashContainer/TrashContainer'
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer'


const RouterModule = () => {

    const routes = createBrowserRouter([
        {
            path:'',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
          path:'/dashboard',
          element:<DashboardContainer/>,
          children:[
            {
              path:"notes",
              element:<NotesContainer/>
            },
            // {
            //   path:"notes/:id",
            //   element:<NotesContainer/>
            // },
            {
              path:"archive",
              element:<ArchiveContainer/>
            },
            // {
            //   path:"archive/:id",
            //   element:<ArchiveContainer/>
            // },
            {
              path:"trash",
              element:<TrashContainer/>
            },
            // {
            //   path:"trash/:id",
            //   element:<TrashContainer/>
            // },
          ]
        }
    ])

  return (
    <RouterProvider router={routes}/>
  )
}

export default RouterModule
