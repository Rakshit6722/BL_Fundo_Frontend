import React, { createContext, useEffect, useState } from 'react'
import { getArchiveNotes, getNotes, getTrashNotes } from '../api'

export const NotesContext = createContext()

const NotesContextProvider = ({ children }) => {

    const [notesList, setNotesList] = useState([])
    const [archiveNotesList, setArchiveNotesList] = useState([])
    const [trashNotesList, setTrashNotesList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [listView, setListView] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const value = {
        notesList,
        setNotesList,
        archiveNotesList,
        setArchiveNotesList,
        trashNotesList,
        setTrashNotesList,
        searchQuery,
        setSearchQuery,
        listView,
        setListView,
        refresh,
        setRefresh
    }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider