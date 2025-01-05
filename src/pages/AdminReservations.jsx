import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import AddReservationModal from '../modals/AdminReservations/AddReservationModal';
import EditReservationModal from '../modals/AdminReservations/EditReservationModal';
import DataGridButton from '../components/DataGridButton';
import dayjs from 'dayjs';

const AdminReservations = () => {
    const theme = useTheme();

    const [selectedRows, setSelectedRows] = useState([]);
    const [activeRow, setActiveRow] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const columns = [
        { 
            field: 'date',
            headerName: 'Data',
            width: 200,
            valueFormatter: (params) => {
                return params.value
            },
        },
        { 
            field: 'time',
            headerName: 'Godzina',
            width: 200,
            valueFormatter: (params) => {
                return params.value
            },
        },
        { field: 'car_name', headerName: 'Samochód', width: 200 },
        { field: 'worker_name', headerName: 'Pracownik', width: 150 },
        { field: 'customer_name', headerName: 'Użytkownik', width: 150 },
        // {
        //     field: 'info',
        //     headerName: 'Edytuj informacje',
        //     width: 200,
        //     headerAlign: 'center',
        //     renderCell: (params) => <DataGridButton onClick={handleEditModalOpen} params={params}/>
        // }
    ];

    const fetchDataGridData = () => {
        setLoading(true);
        fetch('http://127.0.0.1:8000/api/get/reservations')
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data.map((reservation) => ({
                    id: reservation.id,
                    date: reservation.date,
                    time: reservation.time,
                    car: reservation.car,
                    car_name: reservation.car_name,
                    worker: reservation.worker,
                    worker_name: reservation.worker_name,
                    customer: reservation.customer,
                    customer_name: reservation.customer_name,
                }));
                console.log(transformedData)
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
            setSnackbar({ open: true, message: 'Nie zaznaczono żadnej rezerwacji', severity: 'warning' });
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/delete/reservation', {
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

            setSnackbar({ open: true, message: 'Pomyślnie usunięto rezerwacje!', severity: 'success' });
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
                {/* <Button
                    variant="contained"
                    onClick={handleAddModalOpen}
                >
                    Dodaj rezerwację
                </Button> */}
                <Button
                    variant="contained"
                    onClick={handleRemoveSelectedButton}
                    sx={{
                        background: theme.palette.primary.error
                    }}
                >
                    Usuń zaznaczone rezerwacje
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
            
            {/* <AddReservationModal open={addModalOpen} setOpen={setAddModalOpen} fetchDataGridData={fetchDataGridData}/> */}
            {/* <EditReservationModal open={editModalOpen} setOpen={setEditModalOpen} fetchDataGridData={fetchDataGridData} row={activeRow} /> */}
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

export default AdminReservations;