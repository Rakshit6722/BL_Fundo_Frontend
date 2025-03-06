import React, { useState } from 'react'
import '../NoteCard/NoteCard.scss'
import './ReminderCard.scss'
import { MdOutlineAccessTime } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { addUpdateReminder } from '../../api';


function ReminderCard({ noteDetails, handleNotes, handleCloseReminder }) {

    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState("");

    const handleSubmit = () => {
        setError("");

        if (!date || !time) {
            setError("Please select both date and time.");
            return;
        }

        const localDateTime = new Date(`${date}T${time}:00`);
        const currentDateTime = new Date();

        if (localDateTime <= currentDateTime) {
            setError("Selected date and time must be in the future.");
            return;
        }

        const isoDateTime = localDateTime.toISOString();
        console.log(isoDateTime)

        const payload = {
            noteIdList: [noteDetails.id],
            reminder: isoDateTime
        }

        addUpdateReminder(payload)
            .then((res) => {
                console.log(res)
                handleNotes({ ...noteDetails, reminder: [isoDateTime] }, "update")

            })
            .catch((err) => {
                console.log(err)
            })

        setTime('')
        setDate('')
        handleCloseReminder()
    }



    return (
        <div className='reminder-menu-container'>
            <div className='reminder-menu-heading-container'>
                <p>Pick date & time</p>
                <p>Saved in Google Reminders</p>
            </div>

            <div className='reminder-menu-options-container'>

                <input type="date" onChange={(e) => setDate(e.target.value)} />
                <input type="time" onChange={(e) => setTime(e.target.value)} />

                {error && <p className="error-message">{error}</p>}

                <button onClick={handleSubmit}>Save</button>

            </div>


        </div>
    )
}

export default ReminderCard
