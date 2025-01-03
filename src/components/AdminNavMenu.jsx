import logoImage from '../assets/logo_white.png';
import {Box, Button} from '@mui/material';

const UserNavMenu = () => {
    return (
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e0e0e0'
        }}>
            <img
                src={logoImage}
                alt="Logo"
                style={{
                height: '50px',
                cursor: 'pointer'
            }}/>
            <Box
                sx={{
                display: 'flex',
                gap: 2
            }}>
                <Button color="inherit">Wirtualny Salon</Button>
                <Button color="inherit">Salony</Button>
                <Button color="inherit">Pracownicy</Button>
                <Button color="inherit">Samochody</Button>
                <Button color="inherit">Wyloguj</Button>
            </Box>
        </Box>
    );
};

export default UserNavMenu