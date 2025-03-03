import React, { useState, useEffect, useContext, useMemo } from 'react'
import './ArchiveContainer.scss'
import { getArchiveNotes } from '../../api'
import NoteCard from '../NoteCard/NoteCard'
import NotesContextProvider, { NotesContext } from '../../context/NotesContextProvider'
import Masonry from 'react-layout-masonry';

export default function ArchiveContainer() {

  // const [archiveNotesList, setArchiveNotesList] = useState([])
  const [colorPaletteActive, setColorPaletteActive] = useState(null)

  const { archiveNotesList, setArchiveNotesList, searchQuery } = useContext(NotesContext)


  useEffect(() => {
    getArchiveNotesList()
  }, [])

  const getArchiveNotesList = () => {
    getArchiveNotes()
      .then((res) => setArchiveNotesList(res?.data?.data?.data.filter(note => note.isArchived === true && note.isDeleted === false)))
      .catch(err => console.log(err))
  }

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return archiveNotesList
    return archiveNotesList.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, archiveNotesList])

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
        {/* {
          filteredNotes.map((note) => (
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
        } */}
        <Masonry
          columns={{ 350: 1, 750: 2, 900: 5 }}
          gap={16}
        >
          {

            filteredNotes.map((note) => (
              <div>
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
        </Masonry>
      </div>
    </>
  )
}
