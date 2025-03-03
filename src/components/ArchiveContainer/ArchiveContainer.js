import React, { useState, useEffect, useContext } from 'react'
import './ArchiveContainer.scss'
import { getArchiveNotes } from '../../api'
import NoteCard from '../NoteCard/NoteCard'
import NotesContextProvider, { NotesContext } from '../../context/NotesContextProvider'

export default function ArchiveContainer() {

  // const [archiveNotesList, setArchiveNotesList] = useState([])
  const [colorPaletteActive, setColorPaletteActive] = useState(null)

  const { archiveNotesList,setArchiveNotesList } = useContext(NotesContext)

  useEffect(() => {
    getArchiveNotesList()
  }, [])

  const getArchiveNotesList = () => {
    getArchiveNotes()
      .then((res) => setArchiveNotesList(res?.data?.data?.data.filter(note => note.isArchived === true && note.isDeleted === false)))
      .catch(err => console.log(err))
  }

  const handleArchiveNotes = (payload, action) => {
    if (action === 'update') {
      setArchiveNotesList(prev => (
        prev.map(note => (
          note.id === payload.id ? payload : note
        ))
      ))
    } else {
      setArchiveNotesList(prev => (
        prev.filter(note => note.id !== payload?.id)
      ))
    }
  }

  return (
    <>
      <div className='show-archive-notes-container'>
        {
          archiveNotesList.map((note) => (
            <div className='show-archiv-notes-note-container'>
              <NoteCard
                container={'archive'}
                noteDetails={note}
                handleNotes={handleArchiveNotes}
                colorPaletteActive={colorPaletteActive}
                setColorPaletteActive={setColorPaletteActive}
              />
            </div>
          ))
        }
      </div>
    </>
  )
}
