import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";


const FormHobbiesApproved = ({ handleClose, setHobbies, hobby, hobbies,authenticated }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Inside FormHobbies component, after successful POST request
    const handleSumbit = async (approved) => {
        try {
            const response = await fetch(`https://c9knnnk6-3017.use2.devtunnels.ms/hobbies/${hobby.hobbieId}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticated.token}`
                },
                body: JSON.stringify({
                    name: hobby.name,
                    emoji: hobby.emoji,
                    state: approved
                })
            });
    
            if (response.ok) {
                // Update the local state with the updated hobby
                const updatedHobbies = hobbies.map(h =>
                    h.hobbieId === hobby.hobbieId ? { ...h, state: approved} : h
                );
                setHobbies(updatedHobbies);
    
                // Close the form or perform any other actions
                handleClose();
            } else {
                console.error(`Failed to update hobby with ID ${hobby.hobbieId}:`, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };



    return (
        <Box m="20px">
            <Header title="APPROVE HOOBY" subtitle="Approve or Denied a Hooby" />


            <Box display="flex" justifyContent="end" mt="20px">
                <Box
                    width="60%"
                    m="5px"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={colors.greenAccent[600]}
                    borderRadius="4px"
                    onClick={()=>handleSumbit("approved")}

                >
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        APPROVE
                    </Typography>
                </Box>

                <Box
                    width="60%"
                    m="5px"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={colors.redAccent[600]}
                    borderRadius="4px"
                    onClick={()=>handleSumbit("denied")}
                >

                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        DENIED
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FormHobbiesApproved;
