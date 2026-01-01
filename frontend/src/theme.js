import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5865F2", // modern purple
    },
    background: {
      default: "#f7f8fc",
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6b8bff",
    },
    background: {
      default: "#0e0f12",
      paper: "#1a1b1e",
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
