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
import { Route, Routes, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Users from "./scenes/users";
import Hobbies from "./scenes/hobbies";
import Bar from "./scenes/bar";
import Form from "./scenes/form/inde";
import Login from "./scenes/login";
import React, { useState, useEffect } from 'react';


function App() {
  const [theme, colorMode] = useMode();
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    // Check if user session exists in localStorage on component mount
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setAuthenticated(JSON.parse(userData));
      }
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {authenticated && <Sidebar authenticated={authenticated}/>}
          <main className="content">
            {authenticated && <Topbar setAuthenticated={setAuthenticated} />}
            <Routes>
              <Route path="/" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/users" element={authenticated ? <Users authenticated={authenticated} /> : <Navigate to="/login" />} />
              <Route path="/hobbies" element={authenticated ? <Hobbies authenticated={authenticated}/> : <Navigate to="/login" />} />
              <Route path="/bar" element={authenticated ? <Bar /> : <Navigate to="/login" />} />
              <Route path="/form" element={authenticated ? <Form authenticated={authenticated}/> : <Navigate to="/login" />} />
              <Route path="/login" element={!authenticated ? <Login setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;

/*
{
  "username": "admin",
  "email": "admin@mailFake.com",
  "password": "Secure17$",
  "confirmPassword": "Secure17$",
  "phone": 57605,
  "country": "Colombia",
  "city": "Bogotá"
}*/
