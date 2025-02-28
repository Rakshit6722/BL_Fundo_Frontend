import React, { useEffect, useRef, useState } from 'react'
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
import { archiveNote, changeColor, deleteForeverNotes, trashNote } from '../../api';
import Modal from '@mui/material/Modal';
import AddNote from '../NotesContainer/AddNote';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';

function NoteCard({ noteDetails, container, isActive, onClick, handleNotes, colorPaletteActive, setColorPaletteActive, ...props }) {

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [modalOpen, setModalOpen] = useState(false)

  const colorPaletteRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideColorPalette)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideColorPalette)
    }
  }, [colorPaletteActive])


  const handleClickOutsideColorPalette = (e) => {
    if (colorPaletteRef.current && !colorPaletteRef.current.contains(e.target) &&
      !e.target.closest('.note-card-icon')) {
      setColorPaletteActive(null)
    }
  }

  const handleIconClick = (action, ...rest) => {
    const [noteDetailsParam] = rest
    const archivePayload = {
      noteIdList: [noteDetails?.id],
      isArchived: true
    }
    const unarchivePayload = {
      noteIdList: [noteDetails?.id],
      isArchived: false
    }
    const trashPayload = {
      noteIdList: [noteDetails?.id],
      isDeleted: true
    }
    const restorePayload = {
      noteIdList: [noteDetails?.id],
      isDeleted: false
    }
    const deleteForeverPayload = {
      noteIdList: [noteDetails?.id],
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
          handleNotes(noteDetails, 'archive')
        })
        .catch(err => {
          console.log(err.message)
        })
    } else if (action === 'restore') {
      trashNote(restorePayload)
        .then(() => {
          handleNotes(noteDetails, 'restore')
        })
        .catch(err => {
          console.log(err.message)
        })
    } else if (action === 'deleteForever') {
      deleteForeverNotes(deleteForeverPayload)
        .then(() => {
          handleNotes(noteDetails, 'deleteForever')
        })
        .catch(err => {
          console.log(err.message)
        })
    } else if (action === 'update') {
      handleNotes(noteDetailsParam, 'update')
    } else if (action === 'changeColor') {
      const changeColorPayload = {
        noteIdList: [noteDetails?.id],
        color: noteDetailsParam
      }

      changeColor(changeColorPayload)
        .then(() => {
          handleNotes({ ...noteDetails, color: noteDetailsParam }, 'update')
          setColorPaletteActive(null)
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
    <>
      <div className='notes-card-main-container'>
        <div className={`note-card-container ${isActive ? "active" : ""}`} onClick={onClick} style={{
          backgroundColor: noteDetails?.color || 'white'
        }}>
          <div className="note-card-content" onClick={(e) => {
            e.stopPropagation()
            setModalOpen(true)
            // navigate(`/dashboard/${container}/${noteDetails?.id}`)
          }}>
            <div className='note-card-title'>
              {noteDetails?.title}
              <div className='note-card-title-pin note-card-icon'>
                <BsPin />
              </div>
            </div>
            <div className='note-card-description'>
              {noteDetails?.description}
            </div>
          </div>

          {
            (container === 'notes' || container === 'archive') && <div className={`note-card-icons-container ${colorPaletteActive === noteDetails?.id ? 'visible-icons' : ''}`}>
              <div className='note-card-icon'>
                <LuBellPlus />
              </div>
              <div className='note-card-icon'>
                <RiUserAddLine />
              </div>
              <div className='note-card-icon' onClick={(e) => {
                e.stopPropagation()
                setColorPaletteActive(prev => prev === noteDetails?.id ? null : noteDetails?.id)
              }}>
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
                    zIndex: 15,
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
                      <Paper >
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
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
            container === 'trash' && <div className='note-card-delete-icons-container'>
              <div className='note-card-icon delete-icon' onClick={() => handleIconClick('deleteForever')}>
                <MdDeleteForever />
              </div>
              <div className='note-card-icon delete-icon' onClick={() => handleIconClick('restore')}>
                <MdRestoreFromTrash />
              </div>
            </div>
          }
          <Modal
            open={modalOpen}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onclick={() => setModalOpen(false)}
          >
            <AddNote setModalOpen={setModalOpen} noteDetails={noteDetails} handleIconClick={handleIconClick} />
          </Modal>
        </div>
        {
          colorPaletteActive === noteDetails?.id && (
            <div class="color-palate-cnt" ref={colorPaletteRef}>
              <div class="col1" matTooltip="Default" onClick={() => handleIconClick("changeColor", '#FFFFFF')}></div>
              <div class="col2" matTooltip="Coral" onClick={() => handleIconClick("changeColor", '#FAAFA8')}></div>
              <div class="col3" matTooltip="Peach" onClick={() => handleIconClick("changeColor", '#F39F76')}></div>
              <div class="col4" matTooltip="Sand" onClick={() => handleIconClick("changeColor", '#FFF8B8')}></div>
              <div class="col5" matTooltip="Mint" onClick={() => handleIconClick("changeColor", '#E2F6D3')}></div>
              <div class="col6" matTooltip="Sage" onClick={() => handleIconClick("changeColor", '#B4DDD3')}></div>
              <div class="col7" matTooltip="Fog" onClick={() => handleIconClick("changeColor", '#D4E4ED')}></div>
              <div class="col8" matTooltip="Storm" onClick={() => handleIconClick("changeColor", '#AECCDC')}></div>
              <div class="col9" matTooltip="Dusk" onClick={() => handleIconClick("changeColor", '#D3BFDB')}></div>
              <div class="col10" matTooltip="Blossom" onClick={() => handleIconClick("changeColor", '#F6E2DD')}></div>
              <div class="col11" matTooltip="Clay" onClick={() => handleIconClick("changeColor", '#E9E3D4')}></div>
              <div class="col12" matTooltip="Chalk" onClick={() => handleIconClick("changeColor", '#EFEFF1')}></div>
            </div>
          )
        }
      </div>
    </>

  )
}

export default NoteCard