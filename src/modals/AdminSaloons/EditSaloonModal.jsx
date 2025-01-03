import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import GenericAdminModal from '../GenericAdminModal';

const EditSaloonModal = ({ open, setOpen, row}) => {

    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        if (row) {
            setFormValues({
                name: row.name,
                owner: row.owner,
                city: row.city,
                employees: row.employees
            });
        }
    }, [row]);
    
    // TODO: remove after tests
    // useEffect(() => {
    //     console.log(formValues)
    // }, [formValues]);
    
    // TODO: check if data is valid and make a fetch
    const handleSave = () => {
        console.log(`edit ${row.id}`)
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
        setFormValues(null);
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // TODO: fetch it from API if needed
    // const options = [
    //     {id: 1, label: 'Długa 1 Warszawa'},
    //     {id: 2, label: 'Krótka 2 Poznań'},
    //     {id: 3, label: 'Szeroka 3 Kraków'}
    // ]

    return (
        <GenericAdminModal
            title="Edytuj Salon"
            open={open}
            onClose={handleClose}
            onSave={handleSave}
        >
            {formValues ? (<>
                {/*
                TODO: modify fields as needed
                <TextField label="Label" defaultValue={formValues.value} name='name' onChange={handleInputChange} /> 
                <TextField label="Label" defaultValue={formValues.value} slotProps={{input: {readOnly: true}}} />
                <Autocomplete disablePortal options={options} renderInput={(params) => <TextField {...params} label="Label" />} />
                */}
                <TextField label="Nazwa" defaultValue={formValues.name} name='name' onChange={handleInputChange} />
                <TextField label="Właściciel" defaultValue={formValues.owner} name='owner' onChange={handleInputChange} />
            </>) : null}
        </GenericAdminModal>
    );
};

export default EditSaloonModal;