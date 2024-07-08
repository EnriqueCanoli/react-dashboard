import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useTheme } from "@mui/material/styles"; // Correct import
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Hobbies = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [hobbies, setHobbies] = useState([]);

    const columns = [
        { field: "hobbieId", headerName: "ID", flex: 1, },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "emoji",
            headerName: "Emoji",
            flex: 1,
        },
        {
            field: "update",
            headerName: "UPDATE",
            flex: 1,
            renderCell: () => {
                return (
                    <Box
                        width="60%"
                        m="5px"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.blueAccent[600]}
                        borderRadius="4px"
                    >
                        <SecurityOutlinedIcon />
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            Update
                        </Typography>
                    </Box>
                )
            }
        },
        {
            field: "delete",
            headerName: "DELETE",
            flex: 1,
            renderCell: () => {
                return (
                    <Box
                        width="60%"
                        m="5px"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.redAccent[600]}
                        borderRadius="4px"
                    >
                        <SecurityOutlinedIcon />
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            Delete
                        </Typography>
                    </Box>
                )
            }
        },

    ];

    useEffect(() => {
        setHobbies([
            { hobbieId: 3, name: "Football", emoji: "⚽️" },
            { hobbieId: 4, name: "Playing Guitar", emoji: "🎸" },
            { hobbieId: 5, name: "Reading Books", emoji: "📚" },
            { hobbieId: 6, name: "Gaming", emoji: "🎮" },
            { hobbieId: 7, name: "Cooking", emoji: "🍳" },
            { hobbieId: 8, name: "Painting", emoji: "🎨" },
            { hobbieId: 9, name: "Fishing", emoji: "🎣" },
            { hobbieId: 10, name: "Singing", emoji: "🎤" },
            { hobbieId: 11, name: "Weightlifting", emoji: "🏋️‍♂️" },
            { hobbieId: 12, name: "Cycling", emoji: "🚴‍♂️" }
        ]);
    }, []);

    return (
        <Box m="20px">
            <Header title="Hobbies" subtitle="Managing the hobbies app" />
            <Box
                width="20%"
                m="5px"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={colors.greenAccent[600]}
                borderRadius="4px"
            >
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    ADD hobbie
                </Typography>
            </Box>
            <Box m="20px 0 0 0" height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}>

                <DataGrid
                    rows={hobbies}
                    columns={columns}
                    getRowId={(row) => row.hobbieId}
                />
            </Box>
        </Box>
    );
};

export default Hobbies;
