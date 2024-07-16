import { Box, Modal } from "@mui/material";
import FormHobbies from "../scenes/hobbiesForm";

const ModalAdd = ({ handleClose, open,setHobbies,authenticated }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box 
                bgcolor="background.paper"
                p={4}
                borderRadius={2}
                boxShadow={24}
                style={{ width: '80%', maxWidth: '600px' }}
            >
                <FormHobbies handleClose={handleClose} setHobbies={setHobbies}  authenticated={authenticated}/>
            </Box>
        </Modal>
    );
}

export default ModalAdd;
