import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Stack, Container } from "@mui/material";

import MainApp from "./pages/MainApp";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <>
      {/* TOP NAVBAR */}
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="secondary"
            >
              User View
            </Button>

            <Button
              component={Link}
              to="/admin"
              variant="contained"
              color="secondary"
            >
              Admin Dashboard
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* PAGE CONTENT */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;