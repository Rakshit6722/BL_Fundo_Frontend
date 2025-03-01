import React, { useState, useEffect, useContext } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import './TrashContainer.scss'
import { getTrashNotes } from '../../api'
import { NotesContext } from '../../context/NotesContextProvider'

export default function TrashContainer() {
  // const [trashNotesList, setTrashNotesList] = useState([])

  const {trashNotesList, setTrashNotesList} = useContext(NotesContext)

  // useEffect(() => {
  //   getTrashNotesList()
  // }, [])

  // const getTrashNotesList = () => {
  //   getTrashNotes()
  //     .then((res) => setTrashNotesList(res?.data?.data?.data))
  //     .catch(err => console.log(err))
  // }

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
                container={'trash'}
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
