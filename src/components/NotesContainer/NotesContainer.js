import React, { useContext, useEffect, useMemo, useState } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { getNotes } from '../../api'
import './NotesContainer.scss'
import AddNote from './AddNote'
// import Masonry from '@mui/lab/Masonry';
import { NotesContext } from '../../context/NotesContextProvider'
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Masonry from 'react-layout-masonry';
import { SidebarContext } from '../../context/SidebarContext'

export default function NotesContainer() {
    const [isActive, setIsActive] = useState(null)
    const [colorPaletteActive, setColorPaletteActive] = useState(null)

    const { notesList, setNotesList, searchQuery } = useContext(NotesContext)
    const { open } = useContext(SidebarContext)

    console.log("open", open)

    const columnConfig = useMemo(() => {
        if (open) {
            return { 350: 1, 750: 2, 1100: 3, 1400: 4 }
        } else {
            return { 350: 1, 750: 2, 1100: 3, 1400: 5, 1700: 5 }
        }
    }, [open])

    useEffect(() => {
        getNotesList()
    }, [])

    const filteredNotes = useMemo(() => {
        if (!searchQuery.trim()) return notesList
        //here we do not use setNotesList coz in that case it would chane the notesList which in one of the dependency of this useMemo and eventually it will cause infinite loop and crash the application
        return notesList.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [notesList, searchQuery])

    function getNotesList() {
        getNotes().then((data) => {
            console.log("data", data)
            setNotesList(data?.data?.data?.data.filter((note) => note.isDeleted === false && note.isArchived === false).reverse())
        }).catch((err) => {
            console.log(err)
        })
    }

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
                {/* <Masonry
                    columns={{ xs: 1, sm: 1, md: 3, lg: 5 }}
                    spacing={2}
                    defaultHeight={700}
                    defaultColumns={4}
                    defaultSpacing={0}
                >
                    {

                        filteredNotes.map((note) => (
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
                </Masonry> */}
                {/* <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 5 }}
                    gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
                >
                    <Masonry>
                        {

                            filteredNotes.map((note) => (
                                <div>
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
                    </Masonry>
                </ResponsiveMasonry> */}

                <Masonry
                    columns={columnConfig}
                    gap={16}
                >
                    {

                        filteredNotes.map((note) => (
                            <div>
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
                </Masonry>

            </div>
        </div>
    )
}
