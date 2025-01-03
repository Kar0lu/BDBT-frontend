import React from 'react';
import {
    Box,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const DataGridButton = ({onClick, params}) => {
    return(
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
            onClick={() => onClick(params.row)}
            sx={{
                minWidth: 0,
                width: 40,
                height: 40,
                borderRadius: '50%',
            }}
        >
            <EditIcon/>
        </Button>
        </Box>
    );
};

export default DataGridButton;