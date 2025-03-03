import React, { useState, useEffect, useContext, useMemo } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import './TrashContainer.scss'
import { getTrashNotes } from '../../api'
import { NotesContext } from '../../context/NotesContextProvider'
import Masonry from 'react-layout-masonry';
import { SidebarContext } from '../../context/SidebarContext'

export default function TrashContainer() {
  // const [trashNotesList, setTrashNotesList] = useState([])

  const { trashNotesList, notesList, setTrashNotesList, searchQuery } = useContext(NotesContext)

  const { open } = useContext(SidebarContext)

  useEffect(() => {
    getTrashNotesList()
  }, [])

    const columnConfig = useMemo(() => {
      if (open) {
        return { 350: 1, 750: 2, 1100: 3, 1400: 4 }
      } else {
        return { 350: 1, 750: 2, 1100: 3, 1400: 5, 1700: 5 }
      }
    }, [open])

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

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return trashNotesList
    return notesList.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, trashNotesList])

  return (
    <div>
      <div className='show-trash-notes-container'>
        {/* {
          filteredNotes.map((note) => (
            <div className='show-trash-notes-note-container'>
              <NoteCard
                container={'trash'}
                noteDetails={note}
                handleNotes={handleTrashNotes}
              />
            </div>
          ))
        } */}
        <Masonry
          columns={columnConfig}
          gap={16}
        >
          {

            filteredNotes.map((note) => (
              <div>
                <NoteCard
                 container={'trash'}
                 noteDetails={note}
                 handleNotes={handleTrashNotes}
                />
              </div>
            ))
          }
        </Masonry>
      </div>
    </div>
  )
}
