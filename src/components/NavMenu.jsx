import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import logoImage from '../assets/logo_white.png';
import {
    Box,
    Button,
} from '@mui/material';


const NavMenu = () => {
    let { user, logoutUser } = useContext(AuthContext)

    return (
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e0e0e0'
        }}>
            <Link to={'/'}><img
                src={logoImage}
                alt="Logo"
                style={{
                height: '50px',
                cursor: 'pointer'
            }}/></Link>
            <Box
                sx={{
                display: 'flex',
                gap: 2
            }}>
                {user=='admin' ? (
                    <>
                    <Link to={'/showrooms'}><Button color="primary">Salony</Button></Link>
                    <Link to={'/workers'}><Button color="primary">Pracownicy</Button></Link>
                    <Link to={'/cars'}><Button color="primary">Samochody</Button></Link>
                    </>
                ) : null}
                <Link to={'/'}><Button color='primary'>Wirtualny Salon</Button></Link>

                {user ? (<Button color="primary" onClick={logoutUser}>Wyloguj</Button>) : (<Link to={'/login'}><Button color="primary">Zaloguj</Button></Link>)}
            </Box>
        </Box>
    );
};

export default NavMenu