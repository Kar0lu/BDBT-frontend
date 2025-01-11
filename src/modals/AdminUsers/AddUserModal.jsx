import React, { useState, useEffect } from 'react';
import { TextField, Snackbar, Alert, FormControlLabel, Switch, Box } from '@mui/material';
import GenericAdminModal from '../GenericAdminModal';

const AddUserModal = ({ open, setOpen, fetchDataGridData}) => {

    const [formValues, setFormValues] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        if (open) {
            setFormValues({
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                email: '',
                city: '',
                street: '',
                building_number: '',
                is_staff: false,
            });
        } else {
            setFormValues(null);
        }
    }, [open]);

    const handleSave = async () => {

        if (!formValues.username) {
            setSnackbar({ open: true, message: 'Wymagana nazwa użytkownika', severity: 'warning' });
            return;
        }
        if (!formValues.password) {
            setSnackbar({ open: true, message: 'Wymagana hasło', severity: 'warning' });
            return;
        }

        if (!formValues.first_name) {
            setSnackbar({ open: true, message: 'Wymagane imie użytkownika', severity: 'warning' });
            return;
        }

        if (!formValues.last_name) {
            setSnackbar({ open: true, message: 'Wymagane nazwisko użytkownika', severity: 'warning' });
            return;
        }

        if (!formValues.city) {
            setSnackbar({ open: true, message: 'Wymagane miasto', severity: 'warning' });
            return;
        }

        if (!formValues.street) {
            setSnackbar({ open: true, message: 'Wymagana ulica', severity: 'warning' });
            return;
        }

        if (!formValues.building_number) {
            setSnackbar({ open: true, message: 'Wymagany numer budynku', severity: 'warning' });
            return;
        }

        if (formValues.building_number.includes(".")) {
            setSnackbar({ open: true, message: 'Numer budynku musi być liczbą całkowitą', severity: 'warning' });
            return;
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
            setSnackbar({ open: true, message: 'Wymagany poprawny adres email', severity: 'warning' });
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/create/user', {
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

            setSnackbar({ open: true, message: 'Pomyślnie dodano nowego użytkownika!', severity: 'success' });
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
                title="Dodaj Użytkownika"
                open={open}
                onClose={handleClose}
                onSave={handleSave}
            >
                {formValues ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <TextField
                            label="Imię"
                            defaultValue={formValues.first_name}
                            name="first_name"
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Nazwisko"
                            defaultValue={formValues.last_name}
                            name="last_name"
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Nazwa użytkownika"
                            defaultValue={formValues.username}
                            name="username"
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Hasło"
                            defaultValue={formValues.password}
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Email"
                            defaultValue={formValues.email}
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Miasto"
                            defaultValue={formValues.city}
                            name="city"
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Ulica"
                            defaultValue={formValues.street}
                            name="street"
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Numer budynku"
                            defaultValue={formValues.building_number}
                            type="number"
                            name="building_number"
                            onChange={handleInputChange}
                        />
                        <Box sx={{ gridColumn: 'span 2' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formValues.is_staff}
                                        onChange={(e) =>
                                            handleInputChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: e.target.checked,
                                                },
                                            })
                                        }
                                        name="is_staff"
                                    />
                                }
                                label="Administrator"
                            />
                        </Box>
                    </Box>
                ) : null}
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

export default AddUserModal;