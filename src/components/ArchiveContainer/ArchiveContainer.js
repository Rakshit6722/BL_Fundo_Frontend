import React, { useState, useEffect } from 'react'
import './ArchiveContainer.scss'
import { getArchiveNotes } from '../../api'
import NoteCard from '../NoteCard/NoteCard'

export default function ArchiveContainer() {

  const [archiveNotesList, setArchiveNotesList] = useState([])

  useEffect(() => {
    getArchiveNotesList()
  }, [])

  const getArchiveNotesList = () => {
    getArchiveNotes()
      .then((res) => setArchiveNotesList(res?.data?.data?.data.filter(note => note.isArchived === true && note.isDeleted === false)))
      .catch(err => console.log(err))
  }

  const handleArchiveNotes = (payload) => {
    setArchiveNotesList(prev => (
      prev.filter(note => note.id !== payload?.id)
    ))
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
              />
            </div>
          ))
        }
      </div>
    </>
  )
}
