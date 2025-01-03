import React, {useContext} from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    Tooltip
} from '@mui/material';
import AuthContext from '../context/AuthContext'
import cardImage from '../assets/car.png';

const CarModal = ({modalOpen, handleModalClose}) => {
    let {user} = useContext(AuthContext)

    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
            overflowY: 'auto'
        }}>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                boxShadow: 24,
                p: 4,
                maxWidth: '800px',
                mx: 'auto',
                borderRadius: '8px',
                my: 4,

            }}>
                <img
                    src={cardImage}
                    alt="Car placeholder"
                    style={{
                    width: '100%',
                    borderRadius: '8px',
                    objectFit: 'cover'
                }}/>
                <Typography
                    variant="h4"
                    sx={{
                    mt: 2,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    Ford Mustang GT
                </Typography>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    mt: 2
                }}>
                    <Box sx={{
                        flex: 2
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                            Opis
                        </Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu ex sed
                            ipsum porttitor consequat et sit amet enim. Vestibulum mattis auctor lobortis.
                        </Typography>
                    </Box>
                    <Box sx={{
                        flex: 1
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                            Dane techniczne
                        </Typography>
                        <ul
                            style={{
                            paddingLeft: 0,
                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                            fontSize: '1rem',
                            lineHeight: 1.5
                        }}>
                            <li>Stan: nowy</li>
                            <li>Rok produkcji: 2024</li>
                            <li>Paliwo: benzyna</li>
                            <li>Skrzynia: automatyczna</li>
                            <li>Moc: 265</li>
                            <li>Ilość miejsc: 5</li>
                            <li>Spalanie: 10.3 l/km</li>
                            <li>Pojemność silnika: 2.0</li>
                        </ul>
                    </Box>
                </Box>
                <Tooltip placement="top" title={user=='admin' && "Opcja tylko dla zwykłych użytkowników" || !user && "Opcja tylko dla zalogowanych użytkowników"} disableInteractive>
                    <span>
                    <Button variant="contained" disabled={!user&&user!='admin'} sx={{mt:2}}>
                        Umów się na jazdę próbną
                    </Button>
                    </span>
                </Tooltip>
            </Box>
        </Modal>
    );
};

export default CarModal;