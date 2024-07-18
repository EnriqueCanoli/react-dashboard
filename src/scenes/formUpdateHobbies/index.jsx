import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useEffect } from "react";



const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    emoji: yup.string().required("Required"),

});



const FormHobbiesUpdate = ({ handleClose, setHobbies, hobby, hobbies, authenticated }) => {
    console.log(" name " + hobby.name +  " emohi " + hobby.emoji)

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const initialValues = {
        name: hobby.name || '',
        emoji: hobby.emoji || '',
    };
    

    // Inside FormHobbies component, after successful POST request
    const handleFormSubmit = async (values) => {
        try {
            const response = await fetch(`https://c9knnnk6-3017.use2.devtunnels.ms/hobbies/${hobby.hobbieId}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticated.token}`
                },
                body: JSON.stringify({
                    name: values.name,
                    emoji: values.emoji
                })
            });
    
            if (response.ok) {
                // Update the local state with the updated hobby
                const updatedHobbies = hobbies.map(h =>
                    h.hobbieId === hobby.hobbieId ? { ...h, name: values.name, emoji: values.emoji } : h
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
            <Header title="UPDATE HOBBIE" subtitle="Update a Hobbie" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Emoji"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.emoji}
                                name="emoji"
                                error={!!touched.emoji && !!errors.emoji}
                                helperText={touched.emoji && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />

                        </Box>
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
                                onClick={handleSubmit}

                            >

                                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                                    Update Hobbie
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
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default FormHobbiesUpdate;



