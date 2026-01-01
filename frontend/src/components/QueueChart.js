import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const QueueChart = () => {
  const [history, setHistory] = useState([]);

  const fetchQueueSize = async () => {
    const res = await axios.get("http://localhost:8082/api/queue/size");
    setHistory((prev) => [...prev.slice(-20), res.data]); // last 20 points
  };

  useEffect(() => {
    const int = setInterval(fetchQueueSize, 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <Line
      data={{
        labels: history.map((_, i) => i + 1),
        datasets: [
          {
            label: "Queue Size Over Time",
            data: history,
            borderColor: "rgb(75,192,192)",
            tension: 0.3,
          },
        ],
      }}
    />
  );
};

export default QueueChart;
