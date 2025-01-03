import React, { useState } from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import {
    DataGrid,
    GridToolbar
} from '@mui/x-data-grid';
import AdminNavMenu from '../components/AdminNavMenu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// TODO: import data from API
const rows = [
    { id: 3, model: 'Ford Mustang GT', marka: 'Ford', salon: 'Warszawa', stan: 'Wolny', cena: 250000 },
    { id: 4, model: 'Toyota Corolla', marka: 'Toyota', salon: 'Poznań', stan: 'Wolny', cena: 85000 },
    { id: 5, model: 'BMW X5', marka: 'BMW', salon: 'Kraków', stan: 'Wolny', cena: 310000 },
];

const AdminCars = () => {
    const [selectedRows, setSelectedRows] = useState([]);

    const [formValues, setFormValues] = useState({
        model: '',
        marka: '',
        salon: '',
        stan: '',
        cena: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleOpenEditModal = (row) => {
        setOpenEditModal(true);
        setSelectedRow(row);
    };
    // TODO: clear formValues
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedRow(null);
    };
    // TODO: make API call to set new owner
    const handleSaveEditModal = () => {
        console.log({formValues})
    };

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    };
    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    };
    // TODO: make API call to create new saloon
    const handleSaveCreateModal = () => {
        console.log({formValues})
    };
    

    const columns = [
        { field: 'model', headerName: 'Model', width: 200 },
        { field: 'marka', headerName: 'Marka', width: 100 },
        { field: 'salon', headerName: 'Salon', width: 100 },
        { field: 'stan', headerName: 'Stan', width: 100 },
        { field: 'cena', headerName: 'Cena', width: 100 },
        {
            field: 'info',
            headerName: 'Edytuj informacje',
            width: 150,
            headerAlign: 'center',
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => handleOpenEditModal(params.row)}
                        sx={{
                            minWidth: 0,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                        }}
                    >
                        <InfoOutlinedIcon/>
                    </Button>
                </Box>
            ),
        }
    ];

    return (
        <>
            <Box
                sx={{
                    p: 4,
                    display: 'flex',
                    gap: 2,
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => handleOpenCreateModal()}
                >
                    Dodaj samochód
                </Button>
                {/* TODO: make API call to remove selectedRows */}
                <Button
                    variant="contained"
                    onClick={() => console.log(selectedRows)}
                    sx={{
                        background:"#F44336"
                    }}
                >
                    Usuń zaznaczone samochody
                </Button>
            </Box>
            <Box
                sx={{
                    px: 4,
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    onRowSelectionModelChange={(newSelection) => {
                        setSelectedRows(newSelection);
                    }}
                />
            </Box>

            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2" sx={{mb:2}}>
                        Informacje o samochodzie
                    </Typography>
                    <Box
                        sx={{display:'flex', flexDirection:'column', gap:2}}
                    >
                    {selectedRow && 
                    <>
                        <TextField
                            label="Model"
                            defaultValue={selectedRow.model}
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            label="Marka"
                            value={selectedRow.marka}
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            label="Salon"
                            name='salon'
                            defaultValue={selectedRow.salon}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Stan"
                            name='stan'
                            defaultValue={selectedRow.stan}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type='number'
                            label="Cena"
                            name='cena'
                            defaultValue={selectedRow.cena}
                            onChange={handleInputChange}
                        />
                    </>}
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2}}>
                        <Button onClick={handleSaveEditModal} variant='contained'>
                            Zapisz
                        </Button>
                        <Button onClick={handleCloseEditModal} variant="outlined">
                            Zamknij
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={openCreateModal}
                onClose={handleCloseCreateModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2" sx={{mb:2}}>
                        Informacje o samochodzie
                    </Typography>
                    <Box
                        sx={{display:'flex', flexDirection:'column', gap:2}}
                    >
                        <TextField
                            label="Model"
                            name='model'
                            defaultValue={formValues.model}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Marka"
                            name='marka'
                            defaultValue={formValues.marka}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Salon"
                            name='salon'
                            defaultValue={formValues.salon}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Stan"
                            name='stan'
                            defaultValue={formValues.stan}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type='number'
                            label="Cena"
                            name='cena'
                            defaultValue={formValues.cena}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2}}>
                        <Button onClick={handleSaveCreateModal} variant='contained'>
                            Zapisz
                        </Button>
                        <Button onClick={handleCloseCreateModal} variant="outlined">
                            Zamknij
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default AdminCars;
