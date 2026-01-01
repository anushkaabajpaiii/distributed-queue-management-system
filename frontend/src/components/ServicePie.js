import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const ServicePie = () => {
  const [counts, setCounts] = useState({ Doctor: 0, Bank: 0, Visa: 0 });

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:8082/api/appointments/all");
    const data = res.data;

    const c = { Doctor: 0, Bank: 0, Visa: 0 };

    data.forEach((a) => {
      c[a.serviceType] += 1;
    });

    setCounts(c);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Pie
      data={{
        labels: ["Doctor", "Bank", "Visa"],
        datasets: [
          {
            data: [
              counts.Doctor,
              counts.Bank,
              counts.Visa,
            ],
            backgroundColor: ["#42a5f5", "#66bb6a", "#ff7043"],
          },
        ],
      }}
    />
  );
};

export default ServicePie;
