import React from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    MenuItem,
} from '@mui/material';

const SearchSection = ({searchRef}) => {
    return (
        <Box sx={{
            p: 4
        }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Hiper-wyszukiwarka
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: 'repeat(6, 1fr)'
                    },
                    gap: 2,
                    mt: 2
                }}
                ref={searchRef}
            >
                {['Marka', 'Model', 'Rocznik', 'Cena od', 'Cena do'].map((label, index) => (
                    <TextField
                        key={index}
                        select={['Marka', 'Model', 'Rocznik'].includes(label)}
                        label={label}
                        variant="outlined"
                        fullWidth>
                        {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
                            <MenuItem value={option} key={idx}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                ))}
                <Button variant="outlined" fullWidth>
                    SZUKAJ
                </Button>
            </Box>
        </Box>
    );
};

export default SearchSection;