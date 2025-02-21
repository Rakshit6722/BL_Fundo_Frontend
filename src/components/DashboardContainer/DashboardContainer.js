import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardContainer() {
  return (
    <div>
      Dashboard Container
      <Outlet/>
    </div>
  )
}
