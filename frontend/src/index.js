import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./chartSetup";

import App from "./App";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, IconButton } from "@mui/material";

import { lightTheme, darkTheme } from "./theme";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  const [dark, setDark] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline />

        {/* DARK MODE TOGGLE */}
        <IconButton
          onClick={() => setDark(!dark)}
          sx={{ position: "fixed", top: 10, right: 10, zIndex: 999 }}
          color="inherit"
        >
          {dark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <App />

        <ToastContainer
          position="bottom-right"
          theme={dark ? "dark" : "light"}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
