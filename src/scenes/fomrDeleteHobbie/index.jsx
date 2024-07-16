import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";






const FormHobbiesDelete = ({ handleClose, setHobbies, hobby, hobbies,authenticated }) => {
    console.log(" name " + hobby.name + " emohi " + hobby.emoji + "id: " + hobby.hobbieId)

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Inside FormHobbies component, after successful POST request
    const handleFormSubmit = async () => {
        try {
            const response = await fetch(`https://backend-hobbify.onrender.com/hobbies/${hobby.hobbieId}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${authenticated.token}`
                }
            });

            if (response.ok) {
                const updatedHobbies = hobbies.filter(h => h.hobbieId !== hobby.hobbieId);
                setHobbies(updatedHobbies);
                console.log(`Hobby with ID ${hobby.hobbieId} deleted successfully`);
                
                // Perform any additional actions, such as updating the UI or state
            } else {
                console.error(`Failed to delete hobby with ID ${hobby.hobbieId}:`, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        handleClose();

    };


    return (
        <Box m="20px">
            <Header title="Delete Hobbie" subtitle="Are you sure?" />


            <Box display="flex" justifyContent="end" mt="20px">
                {/*create button */}
                <Box
                    width="60%"
                    m="5px"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={colors.greenAccent[600]}
                    borderRadius="4px"
                    onClick={handleFormSubmit}

                >
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        Confirm
                    </Typography>
                </Box>

                {/*Cancel button */}
                <Box
                    width="60%"
                    m="5px"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={colors.redAccent[600]}
                    borderRadius="4px"
                    onClick={handleClose}
                >

                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        Cancel
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FormHobbiesDelete;
