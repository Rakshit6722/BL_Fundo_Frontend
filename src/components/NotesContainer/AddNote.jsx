import React, { useRef, useState, useEffect } from 'react'
import { IoIosCheckboxOutline } from "react-icons/io"
import { IoBrushOutline } from "react-icons/io5";
import { MdOutlineImage } from "react-icons/md";
import './AddNote.scss'
import { addNote } from '../../api';

function AddNote({handleNotes}) {

    const[formData, setFormData] = useState({
        title: '',
        description: ''
    })
    const [isExpanded, setIsExpanded] = useState(false)

    const containerRef = useRef(null)

    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[[isExpanded]])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleToggle = () => {
        setIsExpanded(prev => !prev)

        if(isExpanded){
            addNote(formData)
                .then(res=>{
                    handleNotes(formData,'add')
                })
                .catch(err=>console.log(err))
            
            setFormData({
                title: '',
                description: ''
            })
        }
    }

    const handleClickOutside = (e) => {
        if(containerRef.current && !containerRef.current.contains(e.target)){
            if(isExpanded){
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
                                <div  ref={containerRef} className='add-note-expanded-container'>
                                    <div className='add-note-expanded-title'>
                                        <input type='text' name='title' value={formData.title} onChange={handleChange} placeholder='Title' />
                                        <span>pin</span>
                                    </div>
                                    <input type='text' name='description' value={formData.description} onChange={handleChange} placeholder='Take a note...' />
                                    <div className='add-note-expanded-icons-container'>
                                        <p>icons</p>
                                        <button onClick={handleToggle}>Close</button>
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
