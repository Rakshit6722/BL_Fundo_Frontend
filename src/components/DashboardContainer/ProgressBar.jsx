import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function ProgressBar() {
  return (
    <div style={{
        marginTop: "4rem",
    }}>
      <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    </div>
  )
}

export default ProgressBar
