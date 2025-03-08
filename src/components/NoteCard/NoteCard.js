import React, { useContext, useEffect, useRef, useState } from 'react'
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
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { MdDeleteForever } from "react-icons/md";
import { archiveNote, changeColor, deleteForeverNotes, removeReminder, trashNote } from '../../api';
import Modal from '@mui/material/Modal';
import AddNote from '../NotesContainer/AddNote';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { MdOutlineAccessTime } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import ReminderCard from '../Reminder/ReminderCard';
import { NotesContext } from '../../context/NotesContextProvider';
import { Tooltip } from '@mui/material';


function NoteCard({ noteDetails, container, isActive, onClick, handleNotes, colorPaletteActive, setColorPaletteActive, ...props }) {

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [activeColor, setActiveColor] = useState(noteDetails?.color || "#FFFFFF")
  // console.log("activeColor", activeColor)

  const { listView } = useContext(NotesContext)

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
      setActiveColor(noteDetailsParam)
      const changeColorPayload = {
        noteIdList: [noteDetails?.id],
        color: noteDetailsParam
      }

      changeColor(changeColorPayload)
        .then(() => {
          handleNotes({ ...noteDetails, color: noteDetailsParam }, 'update')
          // setColorPaletteActive(null)
        })
        .catch(err => {
          console.log(err.message)
        })
    } else if (action === 'removeReminder') {
      // handleNotes('removeReminder',noteDetails)
      const payload = {
        noteIdList: [noteDetails?.id],
      }
      removeReminder(payload)
        .then(() => {
          handleNotes({ ...noteDetails, reminder: [] }, 'update')
        })
        .catch(err => {
          console.lor(err.messagae)
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


  const [anchorEl, setAnchorEl] = React.useState(null);
  const openReminder = Boolean(anchorEl);
  const handleClickReminder = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseReminder = () => {
    setAnchorEl(null);
    // if (event && event.target && !event.target.closest('#reminder-menu')) {
    //   setAnchorEl(null);
    // }
  };

  function formatReminder(reminderDateStr) {
    const reminderDate = new Date(reminderDateStr);
    const now = new Date();

    const reminderDay = reminderDate.getDate();
    const reminderMonth = reminderDate.getMonth();
    const reminderYear = reminderDate.getFullYear();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let formattedDate;

    if (reminderDate >= today && reminderDate < tomorrow) {
      formattedDate = "Today";
    } else if (reminderDate >= tomorrow && reminderDate < new Date(tomorrow.getTime() + 86400000)) {
      formattedDate = "Tomorrow";
    } else {
      formattedDate = `${String(reminderDay).padStart(2, "0")}-${String(reminderMonth + 1).padStart(2, "0")}-${String(reminderYear).slice(-2)}`;
    }


    let hours = reminderDate.getHours();
    let minutes = String(reminderDate.getMinutes()).padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate}, ${formattedTime}`;
  }

  return (
    <>
      <div className={`${listView ? "notes-card-main-container-list-view" : "notes-card-main-container"}`}>
        <div className={`${listView ? "note-card-container-list-view" : "note-card-container"} ${isActive ? "active" : ""}`} onClick={onClick} style={{
          backgroundColor: noteDetails?.color || 'white',
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
            (container === 'notes' || container === 'archive' || container === 'reminder') && noteDetails?.reminder && (
              <div style={{
                display: noteDetails?.reminder.length > 0 ? 'flex' : 'none'
              }}
                className='note-card-reminder-container'
              >
                <div>
                  <MdOutlineAccessTime className='reminder-time-icon' />
                </div>
                <div>
                  <p className="note-card-reminder">{
                    noteDetails?.reminder.length > 0 ? formatReminder(noteDetails?.reminder[0]) : ""
                  }</p>
                </div>
                <div className='note-card-reminder-close-icon-container' onClick={() => handleIconClick('removeReminder')}>
                  <IoMdClose className='reminder-close-icon' />
                </div>
              </div>
            )
          }

          {
            (container === 'notes' || container === 'archive' || container === 'reminder') && <div className={`${listView ? "note-card-icons-container-list-view" : "note-card-icons-container"} ${colorPaletteActive === noteDetails?.id ? 'visible-icons' : ''}`}>
              <div className='note-card-icon'
              >

                <IconButton
                  onClick={handleClickReminder}
                  size="small"
                  sx={{
                    color: 'black'
                  }}
                // sx={{ ml: 2 }}
                // aria-controls={open ? 'account-menu' : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
                >
                  <Tooltip title="Remind me">
                    <LuBellPlus />
                  </Tooltip>

                </IconButton>
                {/* reminder menu */}
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openReminder}
                  onClose={handleCloseReminder}
                  // onClick={(e) => {
                  //   e.stopPropagation()
                  //   handleCloseReminder()
                  // }}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        borderRadius: "7px",
                        minWidth: "280px",
                        // padding: "1rem",
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: 0,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: { xs: 'none', sm: 'none', lg: 'none' },
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  keepMounted
                  disablePortal
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <ReminderCard noteDetails={noteDetails} handleNotes={handleNotes} handleCloseReminder={handleCloseReminder} />
                </Menu>

              </div>
              <div className='note-card-icon'>
                <Tooltip title="Collaborator">
                  <RiUserAddLine />
                </Tooltip>
              </div>
              <div className='note-card-icon' onClick={(e) => {
                e.stopPropagation()
                setColorPaletteActive(prev => prev === noteDetails?.id ? null : noteDetails?.id)
              }}>
                <Tooltip title='Background options'>
                  <IoColorPaletteOutline />
                </Tooltip>
              </div>
              <div className='note-card-icon'>
                <Tooltip title="Add image">
                  <MdOutlineImage />
                </Tooltip>
              </div>
              {
                (noteDetails?.isArchived === false) ? (<div className='note-card-icon' onClick={() => handleIconClick('archive')}>
                  <Tooltip title="Archive">
                    <RiInboxArchiveLine />
                  </Tooltip>
                </div>) :
                  (<div className='note-card-icon' onClick={() => handleIconClick('unarchive')}>
                    <Tooltip title="Unarchive">
                      <RiInboxUnarchiveLine />
                    </Tooltip>
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
                <Tooltip title="More">
                  <BsThreeDotsVertical />
                </Tooltip>
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
                <Tooltip title="Delete forever">
                  <MdDeleteForever />
                </Tooltip>
              </div>
              <div className='note-card-icon delete-icon' onClick={() => handleIconClick('restore')}>
                <Tooltip title="Restore">
                  <MdRestoreFromTrash />
                </Tooltip>
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
            <AddNote setModalOpen={setModalOpen} formatReminder={formatReminder} noteDetails={noteDetails} handleIconClick={handleIconClick} />
          </Modal>
        </div>
        {
          colorPaletteActive === noteDetails?.id && (
            <div className="color-palate-cnt" ref={colorPaletteRef}>
              <div className={`col1 ${activeColor === '#FFFFFF' ? "active" : ""}`} matTooltip="Default" onClick={() => handleIconClick("changeColor", '#FFFFFF')}></div>
              <div className={`col2 ${activeColor === '#FAAFA8' ? "active" : ""}`} matTooltip="Coral" onClick={() => handleIconClick("changeColor", '#FAAFA8')}></div>
              <div className={`col3 ${activeColor === '#F39F76' ? "active" : ""}`} matTooltip="Peach" onClick={() => handleIconClick("changeColor", '#F39F76')}></div>
              <div className={`col4 ${activeColor === '#FFF8B8' ? "active" : ""}`} matTooltip="Sand" onClick={() => handleIconClick("changeColor", '#FFF8B8')}></div>
              <div className={`col5 ${activeColor === '#E2F6D3' ? "active" : ""}`} matTooltip="Mint" onClick={() => handleIconClick("changeColor", '#E2F6D3')}></div>
              <div className={`col6 ${activeColor === '#B4DDD3' ? "active" : ""}`} matTooltip="Sage" onClick={() => handleIconClick("changeColor", '#B4DDD3')}></div>
              <div className={`col7 ${activeColor === '#D4E4ED' ? "active" : ""}`} matTooltip="Fog" onClick={() => handleIconClick("changeColor", '#D4E4ED')}></div>
              <div className={`col8 ${activeColor === '#AECCDC' ? "active" : ""}`} matTooltip="Storm" onClick={() => handleIconClick("changeColor", '#AECCDC')}></div>
              <div className={`col9 ${activeColor === '#D3BFDB' ? "active" : ""}`} matTooltip="Dusk" onClick={() => handleIconClick("changeColor", '#D3BFDB')}></div>
              <div className={`col10 ${activeColor === '#F6E2DD' ? "active" : ""}`} matTooltip="Blossom" onClick={() => handleIconClick("changeColor", '#F6E2DD')}></div>
              <div className={`col11 ${activeColor === '#E9E3D4' ? "active" : ""} `} matTooltip="Clay" onClick={() => handleIconClick("changeColor", '#E9E3D4')}></div>
              <div className={`col12 ${activeColor === '#EFEFF1' ? "active" : ""}`} matTooltip="Chalk" onClick={() => handleIconClick("changeColor", '#EFEFF1')}></div>
            </div>

          )
        }
      </div>
    </>

  )
}

export default NoteCard