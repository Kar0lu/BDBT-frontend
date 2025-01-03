import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import GenericAdminModal from '../GenericAdminModal';

const AddSaloonModal = ({ open, setOpen }) => {

    const [formValues, setFormValues] = useState({
        name: '',
        owner: '',

        city: '',
        building_number: '',
        street: ''
    });

    // TODO: remove after tests
    // useEffect(() => {
    //     console.log(formValues)
    // }, [formValues]);

    // TODO: check if data is valid and make a fetch
    const handleSave = () => {
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
        setFormValues({
            name: '',
            owner: '',
    
            city: '',
            building_number: '',
            street: ''
        })
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <GenericAdminModal
            title="Dodaj Salon"
            open={open}
            onClose={handleClose}
            onSave={handleSave}
        >
            <TextField label="Nazwa" defaultValue={formValues.name} name='name' onChange={handleInputChange} />
            <TextField label="Właściciel" defaultValue={formValues.owner} name='owner' onChange={handleInputChange} />
            <TextField label="Miasto" defaultValue={formValues.city} name='city' onChange={handleInputChange} />
            <TextField label="Ulica" defaultValue={formValues.street} name='street' onChange={handleInputChange} />
            <TextField label="Numer budynku" defaultValue={formValues.building_number} name='building_number' onChange={handleInputChange} />

        </GenericAdminModal>
    );
};

export default AddSaloonModal;
