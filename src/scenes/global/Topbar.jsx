import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';

const Topbar = ({setAuthenticated}) => {
    //This line uses the useTheme hook from Material-UI to access the current theme object
    const theme = useTheme();
    //check theme>themeSettings>pallete>mode
    const colors = tokens(theme.palette.mode);
    //this line uses the useContext hook to access the colorModeContext.This context provides the goggleColorMode function
    const colorMode = useContext(ColorModeContext);

    /**
     * Render the top bar component
     * 
     * Box component: create a contianer
     * InputBase, input component
     */
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/**Icons */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}

                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => {
                    localStorage.removeItem("userSession");
                    setAuthenticated(null);

                }}>
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Box>
    )

}

export default Topbar;