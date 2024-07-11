import { Box, Modal } from "@mui/material";
import FormHobbies from "../hobbiesForm";
import FormHobbiesUpdate from "../formUpdateHobbies";


const ModalConfirm = ({open, handleClose,setHobbies, hobby, hobbies })=>{
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
                <FormHobbiesUpdate  handleClose={handleClose} setHobbies={setHobbies} hobby={hobby} hobbies={hobbies}  />
            </Box>
        </Modal>
    );

}

export default ModalConfirm;