import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    Tooltip
} from '@mui/material';
import AuthContext from '../context/AuthContext';
import CreateReservationModal from './User/CreateReservationModal';

const CarModal = ({ car, modalOpen, handleModalClose }) => {
    let { user } = useContext(AuthContext);
    const [secondModalOpen, setSecondModalOpen] = useState(false);

    if (!car) {
        return null;
    }

    const handleSecondModalOpen = () => {
        setSecondModalOpen(true)
    }

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    overflowY: 'auto'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: '#ffffff',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: '800px',
                        mx: 'auto',
                        borderRadius: '8px',
                        my: 4,
                    }}
                >
                    <img
                        src={`http://localhost:8000/media/car_images/${car.brand}_${car.model}.jpg`}
                        alt="Car placeholder"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            objectFit: 'cover'
                        }}
                        onError={(e) => {
                            e.target.src =
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAwMB/eqWI2cAAAAASUVORK5CYII="; // Transparent 1x1 pixel
                            e.target.style.background = "#f0f0f0"; // Optional background
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            mt: 2,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        {car.brand} {car.model}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 4,
                            mt: 2
                        }}
                    >
                        <Box sx={{ flex: 2 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Opis
                            </Typography>
                            <Typography>
                                {car.description}
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Dane samochodu
                            </Typography>
                            <ul
                                style={{
                                    paddingLeft: 0,
                                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                    fontSize: '1rem',
                                    lineHeight: 1.5
                                }}
                            >
                                <li>Marka: {car.brand}</li>
                                <li>Model: {car.model}</li>
                                <li>Cena: {parseInt(car.price, 10)}zł</li>
                                <li>Salon: {car.saloon_name} ({car.saloon_city})</li>
                                <li>Ilość egzemplarzy: {car.number_of_units}</li>
                                <li>Dostępność: {car.availability ? "Dostępny" : "Niedostępny"}</li>
                            </ul>
                        </Box>
                    </Box>
                    <Tooltip
                        placement="top-start"
                        title={user == 'admin' && "Opcja tylko dla zwykłych użytkowników" || user==null && "Opcja tylko dla zalogowanych użytkowników"}
                        disableInteractive
                    >
                        <span>
                            <Button variant="contained" disabled={user == null || user == 'admin'} sx={{ mt: 2 }} onClick={handleSecondModalOpen}>
                                Umów się na jazdę próbną
                            </Button>
                        </span>
                    </Tooltip>
                </Box>
            </Modal>
            <CreateReservationModal open={secondModalOpen} setOpen={setSecondModalOpen} car={car}/>
        </>
    );
};

export default CarModal;