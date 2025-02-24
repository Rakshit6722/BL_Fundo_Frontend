import React from 'react'

function NoteCard({noteDetails, container, ...props}) {
    // console.log(props)
  return (
    <div>
      <span>{noteDetails.title}</span><br></br>
      <span>{noteDetails.description}</span>
      <span>2*2</span>
    </div>
  )
}

export default NoteCard
