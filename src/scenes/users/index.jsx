import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://backend-hobbify.onrender.com/users')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data);
            })
            .catch(error => console.error('Error:', error));

        
    }, []);

    const columns = [
        {
            field: "username",
            headerName: "USERNAME",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "EMAIL",
            headerAlign: "left",
            align: "left",
            flex: 2,
        },
        {
            field: "country",
            headerName: "COUNTRY",
            flex: 1,
        },
        {
            field: "city",
            headerName: "CITY",
            flex: 1,
        },
        {
            field: "isAdmin",
            headerName: "ADMIN",
            flex: 1,
            renderCell: ({value}) => {
                return(
                    <Typography color={value ? colors.greenAccent[600] : colors.blueAccent[300]}>
                        {value ? 'ADMIN' : 'USER'}
                    </Typography>
                );
            }
        },
        {
            field: "isBanned",
            headerName: "BANNED",
            flex: 1,
            renderCell: ({ value }) => {
                return (
                    <Typography color={value ? colors.redAccent[600] : colors.greenAccent[600] }>
                        {value ? 'Banned' : 'Not Banned'}
                    </Typography>
                );
            }
        },
        {
            field: "access",
            headerName: "Restrict",
            headerAlign: "center",
            flex: 2,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        <SecurityOutlinedIcon />
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            Restrict Access
                        </Typography>
                    </Box>
                )
            }
        },

    ]

    return (
        <Box m="20px">
            <Header title="Users" subtitle="Managing the user's app" />
            <Box m="40px 0 0 0" height="75vh"
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
                <DataGrid rows={users} columns={columns} getRowId={(row) => row.userId} />
            </Box>
        </Box>
    )

}

export default Users;