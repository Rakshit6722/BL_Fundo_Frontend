import React, { useState, useEffect, useContext, useMemo } from 'react'
import './ArchiveContainer.scss'
import { getArchiveNotes } from '../../api'
import NoteCard from '../NoteCard/NoteCard'
import NotesContextProvider, { NotesContext } from '../../context/NotesContextProvider'
import Masonry from 'react-layout-masonry';

import { SidebarContext } from '../../context/SidebarContext'
import Placeholder from '../Placeholder/Placeholder'
import toast from 'react-hot-toast'

export default function ArchiveContainer() {

  // const [archiveNotesList, setArchiveNotesList] = useState([])
  const [colorPaletteActive, setColorPaletteActive] = useState(null)

  const { archiveNotesList, setArchiveNotesList, searchQuery, listView, refresh, setRefresh } = useContext(NotesContext)

  const { open } = useContext(SidebarContext)

  const columnConfig = useMemo(() => {
    if (open) {
      return { 350: 1, 750: 2, 1100: 3, 1400: 4 }
    } else {
      return { 350: 1, 750: 2, 1100: 3, 1400: 5, 1700: 5 }
    }
  }, [open])


  useEffect(() => {
    getArchiveNotesList()
  }, [])

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        getArchiveNotesList()
        setRefresh(false)
      }, 1000)}
  },[refresh])


  const getArchiveNotesList = () => {
    getArchiveNotes()
      .then((res) => setArchiveNotesList(res?.data?.data?.data.filter(note => note.isArchived === true && note.isDeleted === false)))
      .catch(err => console.log(err))
  }

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return archiveNotesList
    return archiveNotesList.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, archiveNotesList])
  // const filteredNotes = []
  const handleArchiveNotes = (payload, action) => {
    if (action === 'update' || action === 'removeReminder') {
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
      {
        filteredNotes.length > 0 ? (
          <div className='show-archive-notes-container'>
            <Masonry
              columns={listView ? 1 : columnConfig}
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
        ) : (
          <Placeholder container={'archive'} />
        )
      }

    </>
  )
}
