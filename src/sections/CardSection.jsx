import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
} from '@mui/material';

import cardImage from '../assets/car.png';

const CardSection = ({handleModalOpen}) => {
    return (
        <Box sx={{
            p: 4
        }}>
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: 'repeat(3, 1fr)'
                },
                gap: 4
            }}>
                {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                ].map((item) => (
                    <Card key={item}>
                        <CardActionArea onClick={handleModalOpen}>
                            <CardMedia component="img" height="200" image={cardImage} alt={`Car ${item}`}/>
                            <CardContent>
                                <Typography variant="h6">Car {item}</Typography>
                                <Typography variant="body2">Description of Car {item}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default CardSection;