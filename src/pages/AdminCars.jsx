import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import AddCarModal from '../modals/AdminCars/AddCarModal';
import EditCarModal from '../modals/AdminCars/EditCarModal';
import DataGridButton from '../components/DataGridButton';

const AdminCars = () => {
    const theme = useTheme();

    const [selectedRows, setSelectedRows] = useState([]);
    const [activeRow, setActiveRow] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const columns = [
        { field: 'brand', headerName: 'Marka', width: 200 },
        { field: 'model', headerName: 'Model', width: 200 },
        { field: 'price', headerName: 'Cena', width: 150 },
        { 
            field: 'availability',
            headerName: 'Dostępność',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (params.value ? <CheckIcon /> : <CloseIcon />)
        },
        { field: 'saloon_name', headerName: 'Nazwa salonu', width: 150 },
        { field: 'saloon_city', headerName: 'Miasto', width: 150 },
        { field: 'number_of_units', headerName: 'Liczba egzemplarzy', width: 150 },
        {
            field: 'info',
            headerName: 'Edytuj informacje',
            width: 200,
            headerAlign: 'center',
            renderCell: (params) => <DataGridButton onClick={handleEditModalOpen} params={params}/>
        }
    ];

    const fetchDataGridData = () => {
        setLoading(true);
        fetch('http://127.0.0.1:8000/api/get/cars')
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data.map((car) => ({
                    id: car.id,
                    brand: car.brand,
                    model: car.model,
                    price: car.price,
                    availability: car.availability,
                    saloon: car.saloon,
                    saloon_name: car.saloon_name,
                    saloon_city: car.saloon_city,
                    number_of_units: car.number_of_units
                }));
                setRows(transformedData);
                setLoading(false);
            })
            .catch((error) => {
                setSnackbar({
                    open: true,
                    message: 'Wystąpił nieznany błąd przy ładowaniu danych. Prosimy skontaktować się z administratorem.',
                    severity: 'error',
                });
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchDataGridData();
    }, []);

    const handleRemoveSelectedButton = async () => {  
        if (selectedRows.length === 0) {
            setSnackbar({ open: true, message: 'Nie zaznaczono żadnego salonu', severity: 'warning' });
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/delete/car', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedRows),
            });
    
            if (!response.ok) {
                setSnackbar({
                    open: true,
                    message: 'Wystąpił błąd. Prosimy skontaktować się z administratorem.',
                    severity: 'error',
                });
                return;
            }

            setSnackbar({ open: true, message: 'Pomyślnie usunięto samochód!', severity: 'success' });
            fetchDataGridData();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Wystąpił nieznany błąd. Prosimy skontaktować się z administratorem.',
                severity: 'error',
            });
        }
    }

    const [addModalOpen, setAddModalOpen] = useState(false);
    const handleAddModalOpen = () => {
        setAddModalOpen(true);
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditModalOpen = (row) => {
        setEditModalOpen(true);
        setActiveRow(row);
    };

    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ p: 4 }}>   
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleAddModalOpen}
                >
                    Dodaj samochód
                </Button>
                <Button
                    variant="contained"
                    onClick={handleRemoveSelectedButton}
                    sx={{
                        background: theme.palette.primary.error
                    }}
                >
                    Usuń zaznaczone samochody
                </Button>
            </Box>
            
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
            
            <AddCarModal open={addModalOpen} setOpen={setAddModalOpen} fetchDataGridData={fetchDataGridData}/>
            <EditCarModal open={editModalOpen} setOpen={setEditModalOpen} fetchDataGridData={fetchDataGridData} row={activeRow} />
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
        </Box>
    );
};

export default AdminCars;