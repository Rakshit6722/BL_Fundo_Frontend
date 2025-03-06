import React from 'react'
import './Placeholder.scss'
import { MdOutlineLightbulb } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiBell } from "react-icons/bi";


function Placeholder({ container }) {
    return (
        <div className={`${container === 'notes' ? "placeholder-main-notes-container" : "placeholder-main-others-container"}`}>
            <div className='placeholder-img-icon-container'>
                {
                    container === 'notes' ? (
                        <MdOutlineLightbulb size={120} className='placeholder-img-icon' />
                    ) : container === 'archive' ? (
                        <MdOutlineArchive size={120} className='placeholder-img-icon' />
                    ) : container === 'trash' ? (
                        <FaRegTrashAlt size={90} className='placeholder-img-icon' />
                    ) : (
                        <BiBell size={90} className='placeholder-img-icon' />
                    )
                }
            </div>

            <div className='placeholder-text-container'>
                {
                    container === 'notes' ? (
                        <p>Notes you add appear here</p>
                    ) : container === 'archive' ? (
                        <p>Notes you archive appear here</p>
                    ) : container === 'trash' ? (
                        <p>No notes in Trash </p>
                    ) : (
                        <p>Notes with upcoming reminder appears here</p>
                    )
                }
            </div>
        </div>
    )
}

export default Placeholder
