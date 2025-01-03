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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// TODO: import data from API
const rows = [
    { id: 3, imie: 'Jan', nazwisko: 'Kowalski', stanowisko: 'mechanik', salon: 'Warszawa', pensja: 5000 },
    { id: 4, imie: 'Paweł', nazwisko: 'Górski', stanowisko: 'mechanik', salon: 'Poznań', pensja: 5000 },
    { id: 5, imie: 'Wojciech', nazwisko: 'Pawlak', stanowisko: 'sprzedawca', salon: 'Kraków', pensja: 10000 },
];

const AdminWorkers = () => {
    const [selectedRows, setSelectedRows] = useState([]);

    const [formValues, setFormValues] = useState({
        imie: '',
        nazwisko: '',
        stanowisko: '',
        salon: '',
        stan: '',
        pensja: '',
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
        { field: 'imie', headerName: 'Imie', width: 200 },
        { field: 'nazwisko', headerName: 'Nazwisko', width: 100 },
        { field: 'stanowisko', headerName: 'Stanowisko', width: 100 },
        { field: 'salon', headerName: 'Salon', width: 100 },
        { field: 'pensja', headerName: 'Pensja', width: 100 },
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
                    Dodaj pracownika
                </Button>
                {/* TODO: make API call to remove selectedRows */}
                <Button
                    variant="contained"
                    onClick={() => console.log(selectedRows)}
                    sx={{
                        background:"#F44336"
                    }}
                >
                    Usuń zaznaczonych pracowników
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
                        Informacje o pracowniku
                    </Typography>
                    <Box
                        sx={{display:'flex', flexDirection:'column', gap:2}}
                    >
                    {selectedRow && 
                    <>
                        <TextField
                            label="Imie"
                            defaultValue={selectedRow.imie}
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            label="Nazwisko"
                            value={selectedRow.nazwisko}
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            label="Stanowisko"
                            value={selectedRow.stanowisko}
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
                            type='number'
                            label="Pensja"
                            name='pensja'
                            defaultValue={selectedRow.pensja}
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
                        Informacje o pracowniku
                    </Typography>
                    <Box
                        sx={{display:'flex', flexDirection:'column', gap:2}}
                    >
                        <TextField
                            label="Imie"
                            name='imie'
                            defaultValue={formValues.imie}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Nazwisko"
                            name='nazwisko'
                            defaultValue={formValues.nazwisko}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Stanowisko"
                            name='stanowisko'
                            defaultValue={formValues.stanowisko}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Salon"
                            name='salon'
                            defaultValue={formValues.salon}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type='number'
                            label="Pensja"
                            name='pensja'
                            defaultValue={formValues.pensja}
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

export default AdminWorkers;
