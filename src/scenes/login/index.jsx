import { Formik } from "formik";
import Header from "../../components/Header";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const Login = ({ setAuthenticated }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: ""
    };

    const handleSubmit = async (values) => {
        console.log("LOGIN");
        console.log(values);

        try {
            const response = await fetch('https://c9knnnk6-3017.use2.devtunnels.ms/authown/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            localStorage.setItem('userSession', JSON.stringify({
                token: data.data.token,
                userData: data.data.userData
            }))

            console.log('Response:', data);
            setAuthenticated({
                token: data.data.token,
                userData: data.data.userData
            })
            navigate('/');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Box m="200px">
            <Header title="LOGIN" subtitle="If you already a member, easily log in" />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    handleSubmit,
                    handleChange
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                variant="filled"
                                type="text"
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                variant="filled"
                                type="password"
                                label="Password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secundary" variant="contained">
                                Login
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default Login;
