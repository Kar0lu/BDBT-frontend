import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import AddSaloonModal from '../modals/AdminSaloons/AddSaloonModal';
import EditSaloonModal from '../modals/AdminSaloons/EditSaloonModal';
import DataGridButton from '../components/DataGridButton';

const AdminSaloons = () => {
    const theme = useTheme();

    const [selectedRows, setSelectedRows] = useState([]);
    const [activeRow, setActiveRow] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const columns = [
        { field: 'name', headerName: 'Nazwa', width: 200 },
        { field: 'owner', headerName: 'Właściciel', width: 200 },
        { field: 'city', headerName: 'Miejscowość', width: 150 },
        { field: 'employees', headerName: 'Liczba pracowników', width: 150 },
        {
            field: 'info',
            headerName: 'Edytuj informacje',
            width: 200,
            headerAlign: 'center',
            renderCell: (params) => <DataGridButton onClick={handleEditModalOpen} params={params}/>
        }
    ];

    const fetchSaloons = () => {
        setLoading(true);
        fetch('http://127.0.0.1:8000/api/get/saloons')
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data.map((saloon) => ({
                    id: saloon.id,
                    name: saloon.name,
                    owner: saloon.owner,
                    city: saloon.city,
                    employees: saloon.employees.toString()
                }));
                setRows(transformedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching saloons:', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchSaloons();
    }, []);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const handleAddModalOpen = () => {
        setAddModalOpen(true);
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditModalOpen = (row) => {
        setEditModalOpen(true);
        setActiveRow(row);
    };

    const handleRemoveSelectedButton = async () => {  
        if (selectedRows.length === 0) {
            setSnackbar({ open: true, message: 'Nie zaznaczono żadnego salonu', severity: 'warning' });
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/delete/saloon', {
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

            setSnackbar({ open: true, message: 'Pomyślnie usunięto salony!', severity: 'success' });
            fetchSaloons();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Wystąpił nieznany błąd. Prosimy skontaktować się z administratorem.',
                severity: 'error',
            });
        }
    }

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
                    Dodaj salon
                </Button>
                <Button
                    variant="contained"
                    onClick={handleRemoveSelectedButton}
                    sx={{
                        background: theme.palette.primary.error
                    }}
                >
                    Usuń zaznaczone salony
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
            
            <AddSaloonModal open={addModalOpen} setOpen={setAddModalOpen} fetchSaloons={fetchSaloons}/>
            <EditSaloonModal open={editModalOpen} setOpen={setEditModalOpen} fetchSaloons={fetchSaloons} row={activeRow} />
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

export default AdminSaloons;