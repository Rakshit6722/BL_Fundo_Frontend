import React, { createContext, useEffect, useState } from 'react'
import { getArchiveNotes, getNotes, getTrashNotes } from '../api'

export const NotesContext = createContext()

const NotesContextProvider = ({ children }) => {

    const [notesList, setNotesList] = useState([])
    const [archiveNotesList, setArchiveNotesList] = useState([])
    const [trashNotesList, setTrashNotesList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const value = {
        notesList,
        setNotesList,
        archiveNotesList,
        setArchiveNotesList,
        trashNotesList,
        setTrashNotesList,
        searchQuery,
        setSearchQuery
    }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider