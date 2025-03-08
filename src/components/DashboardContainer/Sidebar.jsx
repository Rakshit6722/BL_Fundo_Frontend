import React, { useEffect, useState } from 'react'
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { IoArchiveOutline } from "react-icons/io5";
import { MdLightbulbOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { NavLink, useLocation } from 'react-router-dom';
import { BiBell } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';


function Sidebar({ open }) {

    const location = useLocation()

    const theme = useTheme();
    const [drawerWidth, setDrawerWidth] = useState(() => getDrawerWidth());

    function getDrawerWidth() {
        if (window.innerWidth > 768) {
            return 280;
        } else if (window.innerWidth > 600) {
            return 250;
        } else {
            return 210;
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setDrawerWidth(getDrawerWidth());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const drawerIcon = [
        {
            icon: <MdLightbulbOutline style={{
                color: location.pathname === '/dashboard/notes' ? "black" : "rgb(88, 88, 88)",
                fontSize: "1.5rem",
                marginLeft: open ? "0" : window.innerWidth <= 480 ? ".87rem" : ".8rem",
                fontSize: window.innerWidth > 768 ? "1.5rem" : window.innerWidth > 600 ? "1.3rem" : "1.1rem"
            }} />
        },
        {
            icon: <IoArchiveOutline
                style={{
                    color: location.pathname === '/dashboard/archive' ? "black" : "rgb(88, 88, 88)",
                    fontSize: "1.5rem",
                    marginLeft: open ? "0" : window.innerWidth <= 480 ? ".87rem" : ".8rem",
                    fontSize: window.innerWidth > 768 ? "1.5rem" : window.innerWidth > 600 ? "1.3rem" : "1.1rem"
                }}
            />
        },
        {
            icon: <BiBell style={{
                color: location.pathname === '/dashboard/reminder' ? "black" : "rgb(88, 88, 88)",
                fontSize: "1.5rem",
                marginLeft: open ? "0" : window.innerWidth <= 480 ? ".87rem" : ".8rem",
                fontSize: window.innerWidth > 768 ? "1.5rem" : window.innerWidth > 600 ? "1.3rem" : "1.1rem"
            }} />
        },
        {
            icon: <BsTrash style={{
                color: location.pathname === '/dashboard/trash' ? "black" : "rgb(88, 88, 88)",
                fontSize: "1.5rem",
                marginLeft: open ? "0" : window.innerWidth <= 480 ? ".87rem" : ".8rem",
                fontSize: window.innerWidth > 768 ? "1.5rem" : window.innerWidth > 600 ? "1.3rem" : "1.1rem"
            }} />
        },

    ]

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            // position: 'relative',
            top: drawerWidth > 250 ? "62px" : drawerWidth > 210 ? "64px" : "40px",
            overflow: 'hidden',
            '& .MuiDrawer-paper': {
                // position: 'relative',
                top: drawerWidth > 250 ? "62px" : drawerWidth > 210 ? "64px" : "40px",
                height: '100vh',
                boxShadow: drawerWidth <= 210 ? open ? "0 2px 4px rgba(3, 3, 3, 0.418)" : "none" : "none",
                borderRight: "none",
                overflow: 'hidden',
                backgroundColor: 'transparent',
            },
            variants: [
                {
                    props: ({ open }) => open,
                    style: {
                        ...openedMixin(theme),
                        '& .MuiDrawer-paper': openedMixin(theme),
                    },
                },
                {
                    props: ({ open }) => !open,
                    style: {
                        ...closedMixin(theme),
                        '& .MuiDrawer-paper': closedMixin(theme),
                    },
                },
            ],
        }),
    );
    return (
        <div>
            <Drawer variant="permanent" open={open} >
                <List
                    sx={{
                        py: { xs: 0, sm: 0, md: .8 },
                        marginTop: ".5rem"
                    }}
                >
                    {[
                        {
                            text: "Notes",
                            path: "/dashboard/notes"
                        },
                        {
                            text: "Archive",
                            path: "/dashboard/archive"
                        },
                        {
                            text: "Reminders",
                            path: "/dashboard/reminder"
                        },
                        {
                            text: "Trash",
                            path: "/dashboard/trash"
                        },

                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <NavLink to={item.path} style={{
                                textDecoration: "none"
                            }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            width: "100%",
                                            minHeight: 48,
                                            px: open ? 2.5 : 0,
                                            py: { xs: 0, sm: 1, md: 1.4 },
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: open ? { xs: ".5rem", sm: "1rem", md: ".8rem" } : "0",
                                            borderRadius: open ? "0 50px 50px 0" : "50%",
                                            backgroundColor: location.pathname === item.path ? "rgb(254, 239, 195)" : "transparent",
                                            width: open ? "auto" : { xs: "45px", sm: "45px", md: "50px" },
                                            height: open ? "auto" : { xs: "40px", sm: "40px", md: "50px" },
                                            justifyContent: open ? "initial" : "center",
                                            marginLeft: open ? "0" : ".5rem",
                                            "&:hover": {
                                                backgroundColor: location.pathname === item.path ? "rgb(254, 239, 195)" : "rgba(0, 0, 0, 0.04)",
                                            }
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    {
                                        !open ? (<>
                                            <Tooltip title={item.text}>
                                                <ListItemIcon
                                                    sx={[
                                                        {
                                                            minWidth: 0,
                                                            justifyContent: 'center',
                                                        },
                                                        open
                                                            ? {
                                                                mr: 3,
                                                            }
                                                            : {
                                                                mr: 'auto',
                                                            },
                                                    ]}
                                                >
                                                    {drawerIcon[index].icon}
                                                </ListItemIcon>
                                            </Tooltip>
                                        </>) : (<>
                                            <ListItemIcon
                                                sx={[
                                                    {
                                                        minWidth: 0,
                                                        justifyContent: 'center',
                                                    },
                                                    open
                                                        ? {
                                                            mr: 3,
                                                        }
                                                        : {
                                                            mr: 'auto',
                                                        },
                                                ]}
                                            >
                                                {drawerIcon[index].icon}
                                            </ListItemIcon>
                                        </>)
                                    }

                                    <ListItemText
                                        primary={
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: ".8rem", sm: ".85rem", md: ".85rem" },
                                                    fontWeight: 600,
                                                    letterSpacing: ".0755555em",
                                                    color: "black !important",
                                                    fontFamily: "Product Sans Light",
                                                }}
                                            >
                                                {item.text}
                                            </Typography>
                                        }
                                        sx={{
                                            opacity: open ? 1 : 0,
                                        }}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default Sidebar
