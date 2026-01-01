import React, { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import axios from "axios";
import API_BASE from "../config";

axios.get(`${API_BASE}/api/queue/size`);


const QueueMetrics = () => {
  const [size, setSize] = useState(0);

  const getSize = async () => {
    const res = await axios.get("http://localhost:8082/api/queue/size");
    setSize(res.data);
  };

  useEffect(() => {
    getSize();
    const interval = setInterval(getSize, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack spacing={1}>
      <Typography variant="h6">Live Queue Size</Typography>
      <Typography variant="h3" color="primary">
        {size}
      </Typography>
    </Stack>
  );
};

export default QueueMetrics;