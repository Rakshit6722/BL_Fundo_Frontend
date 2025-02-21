import React from 'react'

function NoteCard({noteDetails, container, ...props}) {
    // console.log(props)
  return (
    <div style={{
        border: '1px solid black',
        padding: '10px',
        margin: '10px'
    }}>
      <span>{noteDetails.title}</span><br></br>
      <span>{noteDetails.description}</span>
      <span>2*2</span>
    </div>
  )
}

export default NoteCard
