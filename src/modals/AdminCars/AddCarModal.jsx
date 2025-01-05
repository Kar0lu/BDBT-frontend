import React, { useState, useEffect } from 'react';
import { TextField, Snackbar, Alert, FormControlLabel, Switch, Autocomplete } from '@mui/material';
import GenericAdminModal from '../GenericAdminModal';

const AddCarModal = ({ open, setOpen, fetchDataGridData}) => {

    const [formValues, setFormValues] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [saloonPicker, setSaloonPicker] = useState(null);

    useEffect(() => {
        if (open) {
            setFormValues({
                brand: '',
                model: '',
                price: '',
                availability: false,
                saloon: null,
                description: '',
            });

            fetch('http://127.0.0.1:8000/api/get/saloonpicker')
                .then((response) => response.json())
                .then((data) => {
                    const transformedData = data.map((saloon) => ({
                        id: saloon.id,
                        label: saloon.name + ' ' + saloon.city
                    }));
                    setSaloonPicker(transformedData);
                })
                .catch((error) => {
                    setSnackbar({
                        open: true,
                        message: 'Wystąpił nieznany błąd przy ładowaniu danych. Prosimy skontaktować się z administratorem.',
                        severity: 'error',
                    });
                });
        } else {
            setFormValues(null);
            setSaloonPicker(null);
        }
    }, [open]);

    const handleSave = async () => {
        if (formValues.brand == '' || formValues.model == '' || formValues.price == '') {
            setSnackbar({ open: true, message: 'Samochód musi posiadać markę, model oraz cenę', severity: 'warning' });
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/create/car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
    
            if (!response.ok) {
                setSnackbar({
                    open: true,
                    message: 'Wystąpił błąd. Prosimy skontaktować się z administratorem.',
                    severity: 'error',
                });
                return;
            }

            setSnackbar({ open: true, message: 'Pomyślnie dodano nowy samochód!', severity: 'success' });
            fetchDataGridData();
            handleClose();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Wystąpił nieznany błąd. Prosimy skontaktować się z administratorem.',
                severity: 'error',
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <GenericAdminModal
                title="Dodaj Samochód"
                open={open}
                onClose={handleClose}
                onSave={handleSave}
            >
                {formValues ? (<>
                    <TextField label="Marka" defaultValue={formValues.brand} name='brand' onChange={handleInputChange} />
                    <TextField label="Model" defaultValue={formValues.model} name='model' onChange={handleInputChange} />
                    <TextField label="Cena" defaultValue={formValues.price} name='price' onChange={handleInputChange} />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formValues.availability}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: e.target.name,
                                        value: e.target.checked,
                                    },
                                })}
                                name="availability"
                            />
                        }
                        label="Dostępność"
                    />
                    <TextField label="Opis" defaultValue={formValues.description} name='description' onChange={handleInputChange} multiline maxRows={4}/>
                </>) : null}
                {formValues && saloonPicker ? (<>
                    <Autocomplete
                        disablePortal
                        options={saloonPicker}
                        value={saloonPicker.find(saloon => saloon.id === formValues?.saloon) || null}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setFormValues((prevValues) => ({
                                    ...prevValues,
                                    saloon: newValue.id
                                }));
                            } else {
                                setFormValues((prevValues) => ({
                                    ...prevValues,
                                    saloon: null,
                                }));
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Salon" />}
                    />
                </>) : null}
            </GenericAdminModal>
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
        </>
    );
};

export default AddCarModal;