import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import AddUserModal from '../modals/AdminUsers/AddUserModal';
import EditUserModal from '../modals/AdminUsers/EditUserModal';
import DataGridButton from '../components/DataGridButton';

const AdminUsers = () => {
    const theme = useTheme();

    const [selectedRows, setSelectedRows] = useState([]);
    const [activeRow, setActiveRow] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const columns = [
        { field: 'first_name', headerName: 'Imię', width: 200 },
        { field: 'last_name', headerName: 'Nazwisko', width: 200 },
        { 
            field: 'is_staff',
            headerName: 'Administrator',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (params.value ? <CheckIcon /> : <CloseIcon />)
        },
        { field: 'username', headerName: 'Nazwa użytkownika', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
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
        fetch('http://127.0.0.1:8000/api/get/users')
            .then((response) => response.json())
            .then((data) => {
                const transformedData = data.map((user) => ({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    city: user.city,
                    street: user.street,
                    building_number: user.building_number,
                    is_staff: user.is_staff,
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
            setSnackbar({ open: true, message: 'Nie zaznaczono żadnego użytkownika', severity: 'warning' });
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/delete/user', {
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

            setSnackbar({ open: true, message: 'Pomyślnie usunięto użytkowników!', severity: 'success' });
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
                    Dodaj użytkownika
                </Button>
                <Button
                    variant="contained"
                    onClick={handleRemoveSelectedButton}
                    sx={{
                        background: theme.palette.primary.error
                    }}
                >
                    Usuń zaznaczonych użytkowników
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
            
            <AddUserModal open={addModalOpen} setOpen={setAddModalOpen} fetchDataGridData={fetchDataGridData}/>
            <EditUserModal open={editModalOpen} setOpen={setEditModalOpen} fetchDataGridData={fetchDataGridData} row={activeRow} />
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

export default AdminUsers;