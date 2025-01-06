import React, { useState, useEffect, useContext } from 'react';
import { TextField, Snackbar, Alert, Autocomplete } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import GenericAdminModal from '../GenericAdminModal';

import AuthContext from '../../context/AuthContext';

const CreateReservationModal = ({ open, setOpen, car, handleModalClose}) => {

    const [formValues, setFormValues] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [workerPicker, setWorkerPicker] = useState(null);
    let { user_id } = useContext(AuthContext);
    
    useEffect(() => {
        console.log(formValues)
    }, [formValues]);

    useEffect(() => {
        if (open) {
            setFormValues({
                date: null,
                car: car.id,
                worker: null,
                user: user_id,
            });

        } else {
            setFormValues(null);
        }
    }, [open]);
    
    const handleSave = async () => {
        if (!formValues.date || !formValues.user || !formValues.car) {
            setSnackbar({ open: true, message: 'Rezerwacja musi zawierać użytkownika, samochód oraz datę', severity: 'warning' });
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/create/reservation', {
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

            setSnackbar({ open: true, message: 'Pomyślnie zaktualizowano dokonano rezerwacji!', severity: 'success' });
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
    
    const handleInputChange = (newValue) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            date: newValue ? dayjs(newValue).toISOString() : null,
        }));
    };

    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <GenericAdminModal
                title="Rezerwacja"
                open={open}
                onClose={handleClose}
                onSave={handleSave}
            >
                {formValues ? (<>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Wybierz datę"
                        value={formValues?.date ? dayjs(formValues.date) : null}
                        onChange={handleInputChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
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
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateReservationModal;