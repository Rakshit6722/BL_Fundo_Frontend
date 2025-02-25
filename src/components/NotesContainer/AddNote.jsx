import React, { useRef, useState, useEffect } from 'react'
import { IoIosCheckboxOutline } from "react-icons/io"
import { IoBrushOutline } from "react-icons/io5";
import './AddNote.scss'
import { addNote, updateNote } from '../../api';
import { LuBellPlus } from "react-icons/lu";
import { RiUserAddLine } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineImage } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPin } from "react-icons/bs";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { MdRestoreFromTrash } from "react-icons/md"
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import { AiOutlineDelete } from "react-icons/ai";
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useParams, useNavigate } from 'react-router-dom';

function AddNote({ handleNotes, setModalOpen, noteDetails, handleIconClick }) {

    const idParams = useParams()
    const { id } = idParams
    console.log(id)
    console.log(noteDetails?.id)
    console.log(id === noteDetails?.id)

    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [formData, setFormData] = useState({
        title: noteDetails?.title || '',
        description: noteDetails?.description || ''
    })
    const [isExpanded, setIsExpanded] = useState(noteDetails ? true : false)

    const containerRef = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [[isExpanded]])
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleToggleMenuIcon = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleToggle = () => {
        // noteDetails && setModalOpen(false)
        setIsExpanded(prev => !prev)

        if (isExpanded && !noteDetails) {
            addNote(formData)
                .then(res => {
                    handleNotes(res?.data?.status?.details, 'add')
                    // console.log(res?.data?.status?.details)
                })
                .catch(err => console.log(err))

            setFormData({
                title: '',
                description: ''
            })
        } else if (noteDetails) {
            updateNote({ ...noteDetails, title: formData.title, description: formData.description, noteId: noteDetails.id })
                .then((res) => {
                    handleIconClick('update',{ ...noteDetails, title: formData.title, description: formData.description})
                })
                .catch(err => console.log(err))

            setModalOpen(false)
            navigate(`/dashboard/notes`)        }
    }

    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            if (isExpanded) {
                handleToggle()
            }
        }
    }

    return (
        <div className='add-note-main-container'>
            <div className='add-note-sub-container' >
                {
                    !isExpanded ? (
                        <div className='add-note-container' onClick={handleToggle}>
                            <input type='text' placeholder='Take a note...' />
                            <div className='add-note-icons-container'>
                                <div>
                                    <IoIosCheckboxOutline className='add-note-icons' />
                                </div>
                                <div>
                                    <IoBrushOutline className='add-note-icons' />
                                </div>
                                <div>
                                    <MdOutlineImage className='add-note-icons' />
                                </div>
                            </div>
                        </div>
                    ) :
                        (
                            <>
                                <div ref={containerRef} className={`${noteDetails ? 'add-note-expanded-container-editMode' : 'add-note-expanded-container'}`}>
                                    <div className={`${noteDetails ? 'add-note-expanded-title-editMode' : 'add-note-expanded-title'}`}>
                                        <input type='text' name='title' value={formData.title} onChange={handleChange} placeholder='Title' />
                                        {/* <span>pin</span> */}
                                    </div>
                                    <input type='text' name='description' value={formData.description} onChange={handleChange} placeholder='Take a note...' />
                                    <div className='add-note-expanded-icons-container'>
                                        <div className={`${noteDetails ? 'add-note-icon-container-editMode' : 'add-note-icon-container'}`}>
                                            <div className='add-note-icons-expanded'>
                                                <LuBellPlus />
                                            </div>
                                            <div className='add-note-icons-expanded'>
                                                <RiUserAddLine />
                                            </div>
                                            <div className='add-note-icons-expanded'>
                                                <IoColorPaletteOutline />
                                            </div>
                                            <div className='add-note-icons-expanded'>
                                                <MdOutlineImage />
                                            </div>

                                            <div
                                                className='add-note-icons-expanded'
                                                ref={anchorRef}
                                                id="composition-button"
                                                aria-controls={open ? 'composition-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleToggleMenuIcon}

                                            >
                                                <BsThreeDotsVertical />
                                                <Popper
                                                    open={open}
                                                    anchorEl={anchorRef.current}
                                                    role={undefined}
                                                    placement="bottom-start"
                                                    transition
                                                    disablePortal
                                                    sx={{
                                                        borderRadius: "7px"
                                                    }}
                                                >
                                                    {({ TransitionProps, placement }) => (
                                                        <Grow
                                                            {...TransitionProps}
                                                            style={{
                                                                transformOrigin:
                                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                            }}
                                                        >
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={handleClose}>
                                                                    <MenuList
                                                                        id="composition-menu"
                                                                        aria-labelledby="composition-button"
                                                                        onKeyDown={handleListKeyDown}
                                                                    >
                                                                        <MenuItem sx={{ fontSize: { xs: '.8rem', sm: '.8rem', md: '.8rem' }, color: "rgb(88, 88, 88)" }} onClick={handleClose}>Add label</MenuItem>
                                                                        <MenuItem sx={{ fontSize: { xs: '.8rem', sm: '.8rem', md: '.8rem' }, color: "rgb(88, 88, 88)" }} onClick={handleClose}>Add drawing</MenuItem>
                                                                        <MenuItem sx={{ fontSize: { xs: '.8rem', sm: '.8rem', md: '.8rem' }, color: "rgb(88, 88, 88)" }} onClick={handleClose}>Show checkboxes</MenuItem>
                                                                    </MenuList>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Grow>
                                                    )}
                                                </Popper>
                                            </div>
                                        </div>
                                        <button onClick={() => {
                                            handleToggle()
                                        }
                                        }>Close</button>
                                    </div>
                                </div>
                            </>
                        )
                }

            </div>
        </div>
    )
}

export default AddNote
