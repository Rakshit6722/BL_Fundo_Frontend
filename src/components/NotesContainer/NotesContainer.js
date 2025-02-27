import React, { useEffect, useState } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { getNotes } from '../../api'
import './NotesContainer.scss'
import AddNote from './AddNote'

export default function NotesContainer() {

    const [notesList, setNotesList] = useState([])
    const [isActive, setIsActive] = useState(null)
    const [colorPaletteActive, setColorPaletteActive] = useState(null)

    useEffect(() => {
        getNotes().then((data) => {
            console.log("data", data)
            setNotesList(data?.data?.data?.data.filter((note) => note.isDeleted === false && note.isArchived === false).reverse())
        })
    }, [])

    const handleNotes = (payload, action) => {
        if (action === 'add') {
            setNotesList(prev => ([
                payload,
                ...prev
            ])
            )
        } else if (action === 'archive' || action === 'trash') {
            setNotesList(prev => (
                prev.filter(note => note.id !== payload?.id)
            ))
        } else if (action === 'update') {
            setNotesList(prev => (
                prev.map(note => (
                    note.id === payload.id ? payload : note
                ))
            ))
        }
    }

    const handleCardClick = (id) => {
        setIsActive((prevId) => (prevId === id ? null : id))
    }


    return (
        <div className='notes-main-container'>
            <div className='notes-add-note-container'>
                <AddNote handleNotes={handleNotes} />
            </div>
            <div className='show-notes-container'>
                {
                    notesList.map((note) => (
                        <div className='show-notes-note-container'>
                            <NoteCard
                                noteDetails={note}
                                container={"notes"}
                                isActive={isActive === note?.id}
                                onClick={() => handleCardClick(note?.id)}
                                handleNotes={handleNotes}
                                colorPaletteActive={colorPaletteActive}
                                setColorPaletteActive={setColorPaletteActive}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
