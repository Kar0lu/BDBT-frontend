import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Autocomplete, InputAdornment, Snackbar, Alert } from '@mui/material';
import CardSection from './CardSection';

const SearchSection = ({ searchRef }) => {
    const [formValues, setFormValues] = useState({
        brand: '',
        model: '',
        priceFrom: '',
        priceTo: '',
        description: '',
    });
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [searchedCars, setSearchedCars] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/get/brandpicker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => response.json())
            .then((data) => setBrands(data))
            .catch((error) => 
                setSnackbar({
                    open: true,
                    message: 'Wystąpił nieznany błąd. Prosimy skontaktować się z administratorem.',
                    severity: 'error',
                })
            );
    }, []);

    useEffect(() => {
        if (formValues.brand) {
            fetch('http://127.0.0.1:8000/api/get/modelpicker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ brand_id: formValues.brand }),
            })
                .then((response) => response.json())
                .then((data) => setModels(data))
                .catch((error) => 
                    setSnackbar({
                        open: true,
                        message: 'Wystąpił nieznany błąd. Prosimy skontaktować się z administratorem.',
                        severity: 'error',
                    })
                );
        } else {
            setModels([]);
        }
        setFormValues((prevValues) => ({
            ...prevValues,
            model: '',
        }));
    }, [formValues.brand]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleAutocompleteChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value ? value.id : '',
        }));
    };

    const handleSearchClick = () => {
        fetch('http://127.0.0.1:8000/api/search/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        })
            .then((response) => response.json())
            .then((data) => setSearchedCars(data))
            .catch((error) => 
                setSnackbar({
                    open: true,
                    message: 'Wystąpił nieznany błąd. Prosimy skontaktować się z administratorem.',
                    severity: 'error',
                })
            );
            
    };

    useEffect(() => {
        handleSearchClick()
    }, []);

    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Hiper-wyszukiwarka
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' },
                    gap: 2,
                    mt: 2
                }}
                ref={searchRef}
            >
                <Autocomplete
                    value={brands.find((brand) => brand.id === formValues.brand) || null}
                    onChange={(event, value) => {
                        if (value) {
                            handleAutocompleteChange('brand', value)
                        } else {
                            handleAutocompleteChange('brand', null)
                        }
                    }}
                    options={brands}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Marka" variant="outlined" fullWidth />}
                />
                <Autocomplete
                    value={models.find((model) => model.id === formValues.model) || null}
                    onChange={(event, value) => {
                        if (value) {
                            handleAutocompleteChange('model', value)
                        } else {
                            handleAutocompleteChange('model', null)
                        }
                    }}
                    options={models}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Model" variant="outlined" fullWidth />}
                />
                <TextField
                    label="Cena od"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="priceFrom"
                    value={formValues.priceFrom}
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">zł</InputAdornment>,
                    }}
                />
                <TextField
                    label="Cena do"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="priceTo"
                    value={formValues.priceTo}
                    onChange={handleInputChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">zł</InputAdornment>,
                    }}
                />
                <Button variant="outlined" fullWidth onClick={handleSearchClick}>
                    SZUKAJ
                </Button>
            </Box>
            <Box sx={{ mt: 4 }}>
                <CardSection cars={searchedCars} />
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SearchSection;