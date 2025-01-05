import React, { useState, useEffect } from 'react';
import { TextField, Snackbar, Alert, Autocomplete } from '@mui/material';
import GenericAdminModal from '../GenericAdminModal';

const EditReservationModal = ({ open, setOpen, row, fetchDataGridData}) => {

    const [formValues, setFormValues] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [workerPicker, setWorkerPicker] = useState(null);
    
    useEffect(() => {
        if (open) {
            setFormValues({
                id: row.id,
                worker: row.worker
            });

            fetch('http://127.0.0.1:8000/api/get/workerpicker')
                .then((response) => response.json())
                .then((data) => {
                    const transformedData = data.map((reservation) => ({
                        id: reservation.id,
                        label: reservation.name + ' ' + reservation.lastname
                    }));
                    setWorkerPicker(transformedData);
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
            setWorkerPicker(null);
        }
    }, [open]);
    
    const handleSave = async () => {
        // if (!formValues || !formValues.id || !formValues.name || !formValues.owner) {
        //     setSnackbar({ open: true, message: 'Wszystkie pola muszą być wypełnione', severity: 'warning' });
        //     return;
        // }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/edit/reservation', {
                method: 'PATCH',
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

            setSnackbar({ open: true, message: 'Pomyślnie zaktualizowano dane rezerwacji!', severity: 'success' });
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
                title="Edytuj Rezerwację"
                open={open}
                onClose={handleClose}
                onSave={handleSave}
            >
                {formValues && workerPicker ? (<>
                    <Autocomplete
                        disablePortal
                        options={workerPicker}
                        value={workerPicker.find(worker => worker.id === formValues?.worker) || null}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setFormValues((prevValues) => ({
                                    ...prevValues,
                                    worker: newValue.id
                                }));
                            } else {
                                setFormValues((prevValues) => ({
                                    ...prevValues,
                                    worker: null,
                                }));
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Pracownik" />}
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

export default EditReservationModal;