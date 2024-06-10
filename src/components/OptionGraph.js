import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "../styles/optiongraph.css";

const GraphComponent = () => {
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("4");

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);

  const data = {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    datasets: [
      {
        label: "매출",
        data: Array.from({ length: daysInMonth }, () =>
          Math.floor(Math.random() * 1000)
        ),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "사용자수",
        data: Array.from({ length: daysInMonth }, () =>
          Math.floor(Math.random() * 1000)
        ),
        borderColor: "rgb(53, 162, 235)",
        tension: 0.1,
      },
      {
        label: "탈퇴수",
        data: Array.from({ length: daysInMonth }, () =>
          Math.floor(Math.random() * 1000)
        ),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className="select-container">
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {Array.from({ length: 5 }, (_, i) => 2020 + i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-container">
        <div className="chart-wrapper">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
