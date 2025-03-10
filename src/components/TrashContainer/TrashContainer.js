import React, { useState, useEffect, useContext, useMemo } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import './TrashContainer.scss'
import { getTrashNotes } from '../../api'
import { NotesContext } from '../../context/NotesContextProvider'
import Masonry from 'react-layout-masonry';
import { SidebarContext } from '../../context/SidebarContext'
import Placeholder from '../Placeholder/Placeholder'
import toast from 'react-hot-toast'

export default function TrashContainer() {
  // const [trashNotesList, setTrashNotesList] = useState([])

  const { trashNotesList, notesList, setTrashNotesList, searchQuery, listView, refresh, setRefresh } = useContext(NotesContext)

  const { open } = useContext(SidebarContext)

  useEffect(() => {
    getTrashNotesList()
  }, [])

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        getTrashNotesList()
        toast.success("Notes refreshed")
        setRefresh(false)
      }, 1000)}
  },[refresh])

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

  // const filteredNotes = []

  return (
    <div>
      {
        filteredNotes.length > 0 ? (
          <div className='show-trash-notes-container'>
            <Masonry
              columns={listView ? 1 : columnConfig}
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
        ) : (
          <Placeholder container={'trash'} />
        )
      }

    </div>
  )
}
