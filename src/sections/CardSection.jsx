import React, {useState, useEffect} from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
} from '@mui/material';

import cardImage from '../assets/car.png';
import CarModal from '../modals/CarModal';

const CardSection = ({ cars }) => {

    const [selectedCar, setSelectedCar] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // useEffect(() => {
    //     console.log(cars)
    // }, [cars]);

    const handleModalOpen = (car) => {
        setSelectedCar(car);
        setModalOpen(true); // Open modal when a car is selected
    };

    const handleModalClose = () => {
        setModalOpen(false); // Close modal
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 4
                }}
            >
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <Card key={car.id}>
                            <CardActionArea onClick={() => handleModalOpen(car)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={cardImage}
                                    alt={`${car.brand} ${car.model}`}
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {car.brand} {car.model}
                                    </Typography>
                                    <Typography variant="body2">
                                        Cena: {car.price}zł
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                ) : null}
            </Box>
            {cars.length === 0 ? (
                    <Typography textAlign={'center'}> Nie znaleziono samochodów spełniających powyższe kryteria</Typography>
            ) : null}
            {selectedCar && (
                <CarModal
                    car={selectedCar}
                    modalOpen={modalOpen}
                    handleModalClose={handleModalClose}
                />
            )}
        </Box>
    );
};

export default CardSection;