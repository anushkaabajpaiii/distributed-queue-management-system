import React from "react";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";


const AdminPanel = ({ refresh, loading }) => {
  const handleNext = async () => {
    try {
      await axios.get("http://localhost:8082/api/queue/next");
      toast.info("Next user called!");

      refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClear = async () => {
    try {
        await axios.delete("http://localhost:8082/api/queue/clear");
        toast.warn("Queue cleared!");
      
      refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card sx={{ mb: 4, p: 2, boxShadow: 4 }}>

      <CardContent>
        <Typography variant="h5" gutterBottom>
          Admin Controls
        </Typography>

        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleNext} disabled={loading}>
            Next User
          </Button>

          <Button variant="outlined" onClick={handleClear} disabled={loading}>
            Clear Queue
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
