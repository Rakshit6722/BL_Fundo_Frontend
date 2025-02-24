import React, { useState } from 'react'
import './NoteCard.scss'
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
import { MdDelete } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { archiveNote, deleteForeverNotes, trashNote } from '../../api';

function NoteCard({ noteDetails, archiveNoteDetails, trashNotesDetails, handleTrashNotes, container, isActive, onClick, handleNotes, handleArchiveNotes, ...props }) {

  console.log("note", noteDetails)
  console.log("archive note", archiveNoteDetails)

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleIconClick = (action) => {
    const archivePayload = {
      noteIdList: [noteDetails?.id],
      isArchived: true
    }
    const unarchivePayload = {
      noteIdList: [archiveNoteDetails?.id],
      isArchived: false
    }
    const trashPayload = {
      noteIdList: [noteDetails?.id],
      isDeleted: true
    }
    const restorePayload = {
      noteIdList: [trashNotesDetails?.id],
      isDeleted: false
    }
    const deleteForeverPayload = {
      noteIdList: [trashNotesDetails?.id],
      isDeleted: true
    }
    if (action === 'archive') {
      archiveNote(archivePayload)
        .then((res) => {
          handleNotes(noteDetails, 'archive')
        })
        .catch(err => {
          console.log(err.message)
        })
    } else if (action === 'trash') {
      trashNote(trashPayload)
        .then(() => {
          handleNotes(noteDetails, 'trash')
        })
        .catch(err => {
          console.log(err.message)
        })
    } else if (action === 'unarchive') {
      archiveNote(unarchivePayload)
        .then(() => {
          handleArchiveNotes(archiveNoteDetails)
        })
        .catch(err => {
          console.log(err.message)
        })
    } else if(action === 'restore'){
      trashNote(restorePayload)
        .then(() => {
          handleTrashNotes(trashNotesDetails)
        })
        .catch(err => {
          console.log(err.message)
        })
    }else if(action === 'deleteForever'){
      deleteForeverNotes(deleteForeverPayload)
        .then(() => {
          handleTrashNotes(trashNotesDetails)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
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

  return (
    <div className={`note-card-container ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className='note-card-title'>
        {(noteDetails && Object.keys(noteDetails).length > 0) ? noteDetails.title
          : (archiveNoteDetails && Object.keys(archiveNoteDetails).length > 0) ? archiveNoteDetails.title
            : (trashNotesDetails && Object.keys(trashNotesDetails).length > 0) ? trashNotesDetails.title
              : ""}

        <div className='note-card-title-pin note-card-icon'>
          <BsPin />
        </div>
      </div>
      <div className='note-card-description'>
        {(noteDetails && Object.keys(noteDetails).length > 0) ? noteDetails.description
          : (archiveNoteDetails && Object.keys(archiveNoteDetails).length > 0) ? archiveNoteDetails.description
            : (trashNotesDetails && Object.keys(trashNotesDetails).length > 0) ? trashNotesDetails.description
              : ""}
      </div>
      {
        (container === 'notes' || container === 'archive') && <div className='note-card-icons-container'>
          <div className='note-card-icon'>
            <LuBellPlus />
          </div>
          <div className='note-card-icon'>
            <RiUserAddLine />
          </div>
          <div className='note-card-icon'>
            <IoColorPaletteOutline />
          </div>
          <div className='note-card-icon'>
            <MdOutlineImage />
          </div>
          {
            container === 'notes' ? (<div className='note-card-icon' onClick={() => handleIconClick('archive')}>
              <RiInboxArchiveLine />
            </div>) :
              (<div className='note-card-icon' onClick={() => handleIconClick('unarchive')}>
                <RiInboxUnarchiveLine />
              </div>)
          }

          <div
            className='note-card-icon'
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
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
                        // autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem sx={{ fontSize: { xs: '.8rem', sm: '.8rem', md: '1rem' }, color: "rgb(88, 88, 88)" }} onClick={() => handleIconClick('trash')}>Delete Note</MenuItem>
                        <MenuItem sx={{ fontSize: { xs: '.8rem', sm: '.8rem', md: '1rem' }, color: "rgb(88, 88, 88)" }} onClick={handleClose}>Add label</MenuItem>
                        <MenuItem sx={{ fontSize: { xs: '.8rem', sm: '.8rem', md: '1rem' }, color: "rgb(88, 88, 88)" }} onClick={handleClose}>Add drawing</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      }
      {
        container === 'delete' && <div className='note-card-delete-icons-container'>
          <div className='note-card-icon delete-icon' onClick={() => handleIconClick('deleteForever')}>
            <MdDeleteForever />
          </div>
          <div className='note-card-icon delete-icon' onClick={() => handleIconClick('restore')}>
            <MdRestoreFromTrash />
          </div>
        </div>
      }
    </div>
  )
}

export default NoteCard
