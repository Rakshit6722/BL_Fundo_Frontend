import React, { useState, useEffect } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import './TrashContainer.scss'
import { getTrashNotes } from '../../api'

export default function TrashContainer() {
  const [trashNotesList, setTrashNotesList] = useState([])

  useEffect(() => {
    getTrashNotesList()
  }, [])

  const getTrashNotesList = () => {
    getTrashNotes()
      .then((res) => setTrashNotesList(res?.data?.data?.data))
      .catch(err => console.log(err))
  }

  const handleTrashNotes = (payload, action) => {
    if (action === 'update') {
      setTrashNotesList(prev => (
        prev.map(note => (
          note.id === payload.id ? payload : note
        ))
      ))
    } else {
      setTrashNotesList(prev => (
        prev.filter(note => note.id !== payload?.id)
      ))
    }
  }

  return (
    <div>
      <div className='show-trash-notes-container'>
        {
          trashNotesList.map((note) => (
            <div className='show-trash-notes-note-container'>
              <NoteCard
                container={'delete'}
                noteDetails={note}
                handleNotes={handleTrashNotes}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}
