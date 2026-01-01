import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import axios from "axios";

const QueueList = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get("http://localhost:8082/api/queue/all");
    setList(res.data);
  };

  useEffect(() => {
    fetchList();
    const interval = setInterval(fetchList, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={1}>
        Queue Entries
      </Typography>

      {list.map((item, index) => (
        <Slide key={item} direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper
            elevation={4}
            sx={{
              padding: 2,
              marginBottom: 1.5,
              borderLeft: "5px solid #3f51b5",
            }}
          >
            <Typography>
              <strong>{index + 1}.</strong> Appointment ID: {item}
            </Typography>
          </Paper>
        </Slide>
      ))}
    </Box>
  );
};

export default QueueList;
