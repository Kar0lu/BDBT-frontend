import React from 'react';
import bgImage from '../assets/landing_bg.png';
import {
    Box,
    Button,
    Typography,
} from '@mui/material';

const WelcomeSection = ({scrollToSearch, scrollToContact}) => {
    return (
        <Box
            sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                md: '3fr 2fr'
            },
            gap: 4,
            p: 4,
            alignItems: 'center'
        }}>
            <Box>
                <Typography variant="h1" fontWeight="bold">
                    WrumWrum
                </Typography>
                <Typography variant="h4">
                    Znajdź swoje wymarzone auto już dziś!
                </Typography>
                <Box sx={{
                    mt: 2
                }}>
                    <Button
                        variant="outlined"
                        onClick={scrollToContact}
                        sx={{
                        mr: 2
                    }}>
                        Kontakt
                    </Button>
                    <Button variant="outlined" onClick={scrollToSearch}>Wyszukiwarka</Button>
                </Box>
            </Box>
            <Box>
                <img
                    src={bgImage}
                    alt="Car"
                    style={{
                    width: '100%',
                    borderRadius: '8px'
                }}/>
            </Box>
        </Box>
    );
};

export default WelcomeSection;