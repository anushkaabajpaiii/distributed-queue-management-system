import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from "@mui/material";

const HistoryTable = () => {
  const [history, setHistory] = useState([]);

  const load = async () => {
    const res = await axios.get("http://localhost:8082/api/appointments/all");
    setHistory(res.data.reverse());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Typography variant="h6" mb={2}>
        Appointment History
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {history.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.userName}</TableCell>
              <TableCell>{a.serviceType}</TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>{a.appointmentTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HistoryTable;
