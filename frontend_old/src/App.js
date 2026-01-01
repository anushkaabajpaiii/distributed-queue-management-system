import React, { useEffect, useState } from "react";
import { connectWebSocket } from "./websocket";
import axios from "axios";
import {
  Container,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

function App() {
  const [queue, setQueue] = useState([]);
  const [updates, setUpdates] = useState([]);

  const loadQueue = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/queue/all");
      setQueue(res.data);
    } catch (err) {
      console.error("Error loading queue:", err);
    }
  };

  useEffect(() => {
    connectWebSocket((msg) => {
      setUpdates((prev) => [...prev, msg]);
      loadQueue(); // refresh queue live
    });

    loadQueue();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          🚀 Real-Time Queue Dashboard
        </Typography>

        <Button variant="contained" onClick={loadQueue}>
          Refresh Queue
        </Button>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Current Queue
        </Typography>

        <List>
          {queue.length === 0 && (
            <Typography>No users in queue</Typography>
          )}

          {queue.map((id, index) => (
            <ListItem key={id}>
              <ListItemText
                primary={`#${index + 1} → ${id}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6">Live Updates</Typography>
        <Box
          sx={{
            maxHeight: 200,
            overflowY: "auto",
            border: "1px solid #ddd",
            p: 2,
            borderRadius: 2,
          }}
        >
          {updates.map((u, i) => (
            <Typography key={i}>🔥 {u}</Typography>
          ))}
        </Box>
      </Card>
    </Container>
  );
}

export default App;
