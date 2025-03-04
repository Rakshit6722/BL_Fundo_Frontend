import React from 'react'
import './Placeholder.scss'
import { MdOutlineLightbulb } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

function Placeholder({ container }) {
    return (
        <div className={`${container === 'notes' ? "placeholder-main-notes-container" : "placeholder-main-others-container"}`}>
            <div className='placeholder-img-icon-container'>
                {
                    container === 'notes' ? (
                        <MdOutlineLightbulb size={120} className='placeholder-img-icon' />
                    ) : container === 'archive' ? (
                        <MdOutlineArchive size={120} className='placeholder-img-icon' />
                    ) : (
                        <FaRegTrashAlt size={90} className='placeholder-img-icon'/>
                    )
                }
            </div>

            <div className='placeholder-text-container'>
                {
                    container === 'notes' ? (
                        <p>Notes you add appear here</p>
                    ) : container === 'archive' ? (
                        <p>Notes you archive appear here</p>
                    ) : (
                        <p>No notes in Trash </p>
                    )
                }
            </div>
        </div>
    )
}

export default Placeholder
