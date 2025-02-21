import React, { useEffect, useState } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { getNotes } from '../../api'

export default function NotesContainer() {

    const [notesList, setNotesList] = useState([])
    useEffect(() => {
        console.log("use effect amandeep")
        getNotes().then((data) => setNotesList(data?.data?.data?.data))
    }, [])


    return (
        <div>
            {
                notesList.map((note) => <NoteCard noteDetails={note} container={"notes"} />)
            }
        </div>
    )
}
