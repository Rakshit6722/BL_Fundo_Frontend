import React, { useContext, useEffect, useMemo, useState } from 'react'
import './ReminderContainer.scss'
import { getReminderNotes } from '../../api'
import { NotesContext } from '../../context/NotesContextProvider'
import Masonry from 'react-layout-masonry';
import Placeholder from '../Placeholder/Placeholder';
import NoteCard from '../NoteCard/NoteCard';
import { SidebarContext } from '../../context/SidebarContext';

const ReminderContainer = () => {

  const [reminderNotes, setReminderNotes] = useState([])
  const [colorPaletteActive, setColorPaletteActive] = useState(null)

  const { searchQuery } = useContext(NotesContext)

  const { open } = useContext(SidebarContext)

  const columnConfig = useMemo(() => {
    if (open) {
      return { 350: 1, 750: 2, 1100: 3, 1400: 4 }
    } else {
      return { 350: 1, 750: 2, 1100: 3, 1400: 5, 1700: 5 }
    }
  }, [open])

  useEffect(() => {
    getReminderNotes()
      .then((res) => {
        setReminderNotes(res?.data?.data?.data)
      })
      .catch(err => console.log(err.message))
  })

  const handleNotes = (action, payload) => {
    if (action === 'removeReminder') {
      setReminderNotes(prev => (
        prev.filter(note => note.id !== payload?.id)
      ))
    }
  }

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return reminderNotes
    return reminderNotes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, reminderNotes])



  return (

    <div>
      {
        filteredNotes.length > 0 ? (
          <div className='show-reminder-notes-container'>
            <Masonry
              columns={columnConfig}
              gap={16}
            >
              {

                filteredNotes.map((note) => (
                  <div>
                    <NoteCard
                      container={'reminder'}
                      noteDetails={note}
                      handleNotes={handleNotes}
                      colorPaletteActive={colorPaletteActive}
                      setColorPaletteActive={setColorPaletteActive}
                    />
                  </div>
                ))
              }
            </Masonry>
          </div>
        ) : (
          <Placeholder container={'reminder'} />
        )
      }
    </div>
  )
}

export default ReminderContainer
