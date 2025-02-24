import React, { useEffect, useState } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { getNotes } from '../../api'
import './NotesContainer.scss'
import AddNote from './AddNote'

export default function NotesContainer() {

    const [notesList, setNotesList] = useState([])

    useEffect(() => {
        getNotes().then((data) => {
            console.log("data", data)
            setNotesList(data?.data?.data?.data)
        })
    }, [])

    const handleNotes = (payload) => {
        setNotesList(prev => ([
            payload,
            ...prev
        ])
        )
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
                            <NoteCard noteDetails={note} container={"notes"} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
