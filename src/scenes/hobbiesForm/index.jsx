import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const initialValues = {
    name: "",
    emoji: ""
};

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    emoji: yup.string().required("Required"),

});

const FormHobbies = ({ handleClose, setHobbies,authenticated }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Inside FormHobbies component, after successful POST request
    const handleFormSubmit = async (values) => {
    try {
        const response = await fetch('https://c9knnnk6-3017.use2.devtunnels.ms/hobbies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'Authorization': `Bearer ${authenticated.token}`
            },
            body: JSON.stringify({
                name: values.name,
                emoji: values.emoji,
                state:"approved"
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create hobby');
        }

        const newHobby = await response.json();

        // Update hobbies state to include the new hobby
        setHobbies(prevHobbies => [...prevHobbies, newHobby]);

        // Close the form or perform any other actions
        handleClose();
    } catch (error) {
        console.error('Error creating hobby:', error);
        // Handle error state if needed
    }
};


    return (
        <Box m="20px">
            <Header title="CREATE HOBBIE" subtitle="Create a New Hobbie" />

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
                                    Create Hobbie
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

export default FormHobbies;
