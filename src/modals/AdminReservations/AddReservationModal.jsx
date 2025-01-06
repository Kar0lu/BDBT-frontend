import React, { useState, useEffect } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import GenericAdminModal from '../GenericAdminModal';

const AddReservationModal = ({ open, setOpen, fetchDataGridData}) => {

    const [formValues, setFormValues] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        if (open) {
            // setFormValues({
            //     id: reservation.id,
            //     date: reservation.date,
            //     time: reservation.time,
            //     car: reservation.car,
            //     worker: reservation.worker,
            //     customer: reservation.customer,
            // });
        } else {
            setFormValues(null);
        }
    }, [open]);

    const handleSave = async () => {
        if (!formValues.id) {
            setSnackbar({ open: true, message: 'Rezerwacja musi mieć id', severity: 'warning' });
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/create/reservation', {
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

            setSnackbar({ open: true, message: 'Pomyślnie dodano nową rezerwację!', severity: 'success' });
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
                title="Dodaj Rezerwację"
                open={open}
                onClose={handleClose}
                onSave={handleSave}
            >
                {/* {formValues ? (<>
                <TextField label="Nazwa" defaultValue={formValues.name} name='name' onChange={handleInputChange} />
                <TextField label="Właściciel" defaultValue={formValues.owner} name='owner' onChange={handleInputChange} />
                <TextField label="Miasto" defaultValue={formValues.city} name='city' onChange={handleInputChange} />
                <TextField label="Ulica" defaultValue={formValues.street} name='street' onChange={handleInputChange} />
                <TextField label="Numer budynku" defaultValue={formValues.building_number} name='building_number' onChange={handleInputChange} />
                </>) : null} */}
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

export default AddReservationModal;