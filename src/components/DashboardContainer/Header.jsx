import React, { useEffect, useState } from 'react'
import './Header.scss'
import { IoIosMenu } from "react-icons/io";
import { IoSearch, IoSettingsOutline } from "react-icons/io5"
import { MdOutlineRefresh } from "react-icons/md"
import Avatar from '@mui/material/Avatar';
import keepLogo from '../../assets/keep_logo.png'

function Header() {

    const [initials, setInitials] = useState('')
    const [color, setColor] = useState('')

    const getInitials = () => {
        let name = localStorage.getItem("firstName");
        let initials = name?.charAt(0).toUpperCase();
        return initials
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        setInitials(getInitials)
        setColor(getRandomColor)
    }, [])

    return (
        <>
            <div className='header-main-container'>
                <div className='header-logo-container'>
                    <div className='menu-logo-container'>
                        <IoIosMenu className='menu-logo' />
                    </div>
                    <img src={keepLogo} alt='keep_logo' />
                    <p>Keep</p>
                </div>
                <div className='header-search-container'>
                    <div className='header-search-icon-container'>
                        <IoSearch className='header-search' />
                    </div>
                    <input type='text' placeholder='Search' />
                </div>
                <div className='header-additional-icons-container'>

                    <div className='header-additional-icon-sub-container header-additional-search-icon-container'>
                        <IoSearch className='header-additional-icon' />
                    </div>

                    <div className='header-additional-icon-sub-container'>
                        <MdOutlineRefresh className='header-additional-icon' />
                    </div>

                    <div className='header-additional-icon-sub-container'>
                        <IoSettingsOutline className='header-additional-icon' />
                    </div>

                    <div className='header-profile-initial-container'>
                        <Avatar sx={{
                            bgcolor: color
                        }}>{initials}</Avatar>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
