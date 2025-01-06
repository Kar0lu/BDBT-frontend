import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const GenericAdminModal = ({ open, onClose, title, children, onSave }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
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
                <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {children}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button onClick={onSave} variant="contained" type="submit">
                        Zapisz
                    </Button>
                    <Button onClick={onClose} variant="outlined">
                        Zamknij
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default GenericAdminModal;