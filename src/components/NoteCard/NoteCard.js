import React from 'react'
import './NoteCard.scss'

function NoteCard({ noteDetails, container, ...props }) {
  // console.log(props)
  return (
    <div className='note-card-container'>
      <div className='note-card-title'>
        {noteDetails.title}
      </div>
      <div className='note-card-description'>
        {noteDetails.description}
      </div>
    </div>
  )
}

export default NoteCard
