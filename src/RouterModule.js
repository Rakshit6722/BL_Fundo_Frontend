import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import DashboardContainer from './components/DashboardContainer/DashboardContainer'
import NotesContainer from './components/NotesContainer/NotesContainer'
import TrashContainer from './components/TrashContainer/TrashContainer'
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthRoute from './components/ProtectedRoute/AuthRoute'


const RouterModule = () => {

  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthRoute>
        <Login />
      </AuthRoute>
    },
    {
      path: '/register',
      element: <AuthRoute>
        <Register />
      </AuthRoute>
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardContainer />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "notes", index: true,
          element: <NotesContainer />
        },
        // {
        //   path:"notes/:id",
        //   element:<NotesContainer/>
        // },
        {
          path: "archive",
          element: <ArchiveContainer />
        },
        // {
        //   path:"archive/:id",
        //   element:<ArchiveContainer/>
        // },
        {
          path: "trash",
          element: <TrashContainer />
        },
        // {
        //   path:"trash/:id",
        //   element:<TrashContainer/>
        // },
      ]
    }
  ])

  return (
    <RouterProvider router={routes} />
  )
}

export default RouterModule
