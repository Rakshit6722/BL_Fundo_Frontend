import React, { createContext, useEffect, useState } from 'react'
import { getArchiveNotes, getNotes, getTrashNotes } from '../api'

export const NotesContext = createContext()

const NotesContextProvider = ({ children }) => {

    const [notesList, setNotesList] = useState([])
    const [archiveNotesList, setArchiveNotesList] = useState([])
    const [trashNotesList, setTrashNotesList] = useState([])

    useEffect(() => {
        getNotesList()
        getArchiveNotesList()
        getTrashNotesList()
    }, [])

    function getNotesList() {
        getNotes().then((data) => {
            console.log("data", data)
            setNotesList(data?.data?.data?.data.filter((note) => note.isDeleted === false && note.isArchived === false).reverse())
        }).catch((err) => {
            console.log(err)
        })
    }

    function getArchiveNotesList() {
        getArchiveNotes().then((data) => {
            console.log("data", data)
            setArchiveNotesList(data?.data?.data?.data.filter((note) => note.isDeleted === false && note.isArchived === true).reverse())
        }).catch((err) => {
            console.log(err)
        })
    }

    function getTrashNotesList() {
        getTrashNotes().then((data) => {
            console.log("data", data)
            setTrashNotesList(data?.data?.data?.data.filter((note) => note.isDeleted === true).reverse())
        }).catch(err => {
            console.log(err)
        })
    }

    const value = {
        notesList,
        setNotesList,
        archiveNotesList,
        setArchiveNotesList,
        trashNotesList,
        setTrashNotesList,
    }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider