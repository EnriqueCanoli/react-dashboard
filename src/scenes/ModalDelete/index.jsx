import { Box, Modal } from "@mui/material";
import FormHobbiesDelete from "../fomrDeleteHobbie";


const ModalDelete = ({open, handleClose,setHobbies, hobby, hobbies, authenticated})=>{
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
                <FormHobbiesDelete  handleClose={handleClose} setHobbies={setHobbies} hobby={hobby}  hobbies={hobbies} authenticated={authenticated}/>
            </Box>
        </Modal>
    );

}

export default ModalDelete;