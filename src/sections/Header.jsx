import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import logoImage from '../assets/logo_white.png';
import {
    Box,
    Button,
} from '@mui/material';


const Header = () => {
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
                    <Link to={'/adminsaloons'}><Button color="primary">Salony</Button></Link>
                    <Link to={'/admincars'}><Button color="primary">Samochody</Button></Link>
                    <Link to={'/adminreservations'}><Button color="primary">Rezerwacje</Button></Link>
                    <Link to={'/adminusers'}><Button color="primary">Użytownicy</Button></Link>
                    <Link><Button color="primary" disabled>Pracownicy</Button></Link>
                    </>
                ) : null}
                {user!=null && user!='admin' ? (
                    <Link to={'/reservations'}><Button color="primary">Rezerwacje</Button></Link>
                ) : null}
                <Link to={'/'}><Button color='primary'>Wirtualny Salon</Button></Link>

                {user!=null ? (<Button color="primary" onClick={logoutUser}>Wyloguj</Button>) : (<Link to={'/login'}><Button color="primary">Zaloguj</Button></Link>)}
            </Box>
        </Box>
    );
};

export default Header;