import React, { useState, useEffect } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import GenericAdminModal from '../GenericAdminModal';

const EditSaloonModal = ({ open, setOpen, row, fetchDataGridData}) => {

    const [formValues, setFormValues] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        if (open) {
            setFormValues({
                id: row.id,
                name: row.name,
                owner: row.owner
            });
        } else {
            setFormValues(null);
        }
    }, [open]);
    
    const handleSave = async () => {
        if (!formValues.id) {
            setSnackbar({ open: true, message: 'Wymagane id salonu', severity: 'warning' });
            return;
        }

        if (!formValues.name) {
            setSnackbar({ open: true, message: 'Wymagana nazwa salonu', severity: 'warning' });
            return;
        }

        if (!formValues.owner) {
            setSnackbar({ open: true, message: 'Wymagana nazwa właściciela salonu', severity: 'warning' });
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/edit/saloon', {
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

            setSnackbar({ open: true, message: 'Pomyślnie zaktualizowano dane salonu!', severity: 'success' });
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
                title="Edytuj Salon"
                open={open}
                onClose={handleClose}
                onSave={handleSave}
            >
                {formValues ? (<>
                    <TextField label="Nazwa" defaultValue={formValues.name} name='name' onChange={handleInputChange} />
                    <TextField label="Właściciel" defaultValue={formValues.owner} name='owner' onChange={handleInputChange} />
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

export default EditSaloonModal;