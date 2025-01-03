import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme } from '@mui/material';
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

    useEffect(() => {
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
                    onClick={() => console.log(selectedRows)}
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
            
            <AddSaloonModal open={addModalOpen} setOpen={setAddModalOpen}/>
            <EditSaloonModal open={editModalOpen} setOpen={setEditModalOpen} row={activeRow}/>
        </Box>
    );
};

export default AdminSaloons;