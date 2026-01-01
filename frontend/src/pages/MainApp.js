import React from "react";
import QueueMetrics from "../components/QueueMetrics";
import QueueList from "../components/QueueList";

const MainApp = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>User View</h2>
      <QueueMetrics />
      <QueueList />
    </div>
  );
};

export default MainApp;
