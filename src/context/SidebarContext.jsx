import React, { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext()

const SidebarContextProvider = ({children}) => {

    const [open, setOpen] = useState(() => getInitialState())

    // console.log("open",open)
      
    
      function getInitialState() {
        if (window.innerWidth > 480) {
          return true
        } else {
          return false
        }
      }

    //   useEffect(() => {
    //       const handleResize = () => {
    //         setOpen(getInitialState());
    //       };
      
    //       window.addEventListener('resize', handleResize);
    //       return () => {
    //         window.removeEventListener('resize', handleResize);
    //       };
    //     }, []);
    
      const value = {
        open,
        setOpen,
        getInitialState
      }

    return(
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarContextProvider