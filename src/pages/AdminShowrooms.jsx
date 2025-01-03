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
    { id: 3, col1: 'Jan&Kowalski sp. z o.o', col2: 'Warszawa', col3: '200' },
    { id: 4, col1: 'Jan&Kowalski sp. z o.o', col2: 'Poznań', col3: '100' },
    { id: 5, col1: 'Jan&Kowalski sp. z o.o', col2: 'Kraków', col3: '150' },
];

const AdminShowrooms = () => {
    const [selectedRows, setSelectedRows] = useState([]);

    const [owner, setOwner] = useState(null);
    const [city, setCity] = useState(null);

    const handleOwnerChange = (event) => {
        setOwner(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleOpenEditModal = (row) => {
        setOpenEditModal(true);
        setSelectedRow(row);
    };
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedRow(null);
    };
    // TODO: make API call to set new owner
    const handleSaveEditModal = () => {
        console.log({owner})
    };

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    };
    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
        setOwner(null);
        setCity(null);
    };
    // TODO: make API call to create new saloon
    const handleSaveCreateModal = () => {
        console.log({owner, city})
    };
    

    const columns = [
        { field: 'col1', headerName: 'Salon', width: 200 },
        { field: 'col2', headerName: 'Miejscowość', width: 150 },
        { field: 'col3', headerName: 'Liczba pracowników', width: 150 },
        {
            field: 'col4',
            headerName: 'Edytuj informacje',
            width: 200,
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
                    Dodaj salon
                </Button>
                {/* TODO: make API call to remove selectedRows */}
                <Button
                    variant="contained"
                    onClick={() => console.log(selectedRows)}
                    sx={{
                        background:"#F44336"
                    }}
                >
                    Usuń zaznaczone salony
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
                        Informacje o salonie
                    </Typography>
                    <Box
                        sx={{display:'flex', flexDirection:'column', gap:2}}
                    >
                    {selectedRow && 
                    <>
                        <TextField
                            label="Właściciel"
                            defaultValue={selectedRow.col1}
                            onChange={handleOwnerChange}
                        />
                        <TextField
                            label="Miejscowość"
                            value={selectedRow.col2}
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            label="Liczba pracowników"
                            value={selectedRow.col3}
                            slotProps={{
                                input: {
                                readOnly: true,
                                },
                            }}
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
                        Informacje o salonie
                    </Typography>
                    <Box
                        sx={{display:'flex', flexDirection:'column', gap:2}}
                    >
                        <TextField
                            label="Właściciel"
                            onChange={handleOwnerChange}
                        />
                        <TextField
                            label="Miejscowość"
                            onChange={handleCityChange}
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

export default AdminShowrooms;
