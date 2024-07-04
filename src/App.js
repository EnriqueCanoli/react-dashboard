/**
 * CssBaseline is going to reset our css to the default
 * ThemeProvider, a component that applies a Meterial-UI theme to the entire component tree below it
 * 
 * colorMode: an object containing the toggleColorMode function, which allows the mode to be toggled between dark and light
 * 
 * ContextModeProvider (context provider), Any component within this provider can access the colorMode context to toggle the color mode
 */
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import  Dashboard  from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
