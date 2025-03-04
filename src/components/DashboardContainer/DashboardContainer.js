import React, { useState, useEffect, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import './DashboardContainer.scss'
import { SidebarContext } from '../../context/SidebarContext'

export default function DashboardContainer() {

  const { open, setOpen, getInitialState } = useContext(SidebarContext)

  useEffect(() => {
    const handleResize = () => {
      setOpen(getInitialState());
      // console.log("open", open)
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSetOpen = () => {
    setOpen(prev => !prev)
  }

  return (
    <>
      {/* <ProgressBar /> */}
      <div className='dashboard-main-container' >
        <div>
          <Header handleSetOpen={handleSetOpen} />
        </div>
        <div className='dashboard-content-container'>
          <div className='sidebar-container'>
            <Sidebar open={open} />
          </div>
          <div className='content-container'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
