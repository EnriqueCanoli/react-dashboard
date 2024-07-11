import { Box, Modal, Typography, Button } from "@mui/material";
import React from "react";

const ModalConfirm = ({ handleCloseConfirm, openConfirm }) => {
    return (
        <Modal
            open={openConfirm}
            onClose={handleCloseConfirm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirmation
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this hobby?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleCloseConfirm} color="primary" sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleCloseConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalConfirm;
