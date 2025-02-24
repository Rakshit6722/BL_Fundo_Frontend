import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import './DashboardContainer.scss'
import ProgressBar from './ProgressBar'

export default function DashboardContainer() {

  const [open, setOpen] = useState(() => getInitialState())
  

  function getInitialState() {
    if (window.innerWidth > 480) {
      return true
    } else {
      return false
    }
  }


  useEffect(() => {
    const handleResize = () => {
      setOpen(getInitialState());
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
