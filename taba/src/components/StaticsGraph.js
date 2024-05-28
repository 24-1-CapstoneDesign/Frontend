import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "chart.js/auto";
import "../styles/staticsgraph.css"; // 새로운 CSS 파일 불러오기

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const StaticsGraph = () => {
  const pieData = {
    labels: ["소형차", "중형차", "대형차"],
    datasets: [
      {
        data: [60, 20, 20],
        backgroundColor: ["#3b82f6", "#f59e0b", "#ef4444"],
        hoverBackgroundColor: ["#2563eb", "#d97706", "#dc2626"],
      },
    ],
  };

  const barData = {
    labels: ["성공", "실패"],
    datasets: [
      {
        label: "비율",
        data: [60, 40],
        backgroundColor: ["#3b82f6", "#ef4444"],
        hoverBackgroundColor: ["#2563eb", "#dc2626"],
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
      y: {
        ticks: {
          callback: function (value) {
            return value === "성공" ? "성공" : "실패";
          },
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const locationData = [
    "서울 신림동",
    "경기 부천시",
    "인천 부평시",
    "서울 마포구",
    "서울 강남구",
    "경기 안양시",
  ];

  return (
    <div className="stat-container">
      <div className="stat-box">
        <h2>차종</h2>
        <div className="pie-chart-container">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
        <ul className="stat-list">
          {pieData.labels.map((label, index) => (
            <li key={index} className="stat-list-item">
              <span
                className="stat-color-box"
                style={{
                  backgroundColor: pieData.datasets[0].backgroundColor[index],
                }}
              ></span>
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="stat-box">
        <h2>해결율</h2>
        <div className="bar-chart-container">
          <Bar
            data={barData}
            options={{ ...barOptions, maintainAspectRatio: false }}
          />
        </div>
        <div className="stat-bar-labels">
          <div className="stat-bar-label">
            <span
              className="stat-color-box"
              style={{ backgroundColor: "#3b82f6" }}
            ></span>
            성공
          </div>
          <div className="stat-bar-label">
            <span
              className="stat-color-box"
              style={{ backgroundColor: "#ef4444" }}
            ></span>
            실패
          </div>
        </div>
      </div>
      <div className="stat-box">
        <h2>발생지역</h2>
        <ol className="stat-ordered-list">
          {locationData.map((location, index) => (
            <li key={index} className="stat-ordered-list-item">
              <div className="location-number">{index + 1}</div>
              <div className="location-text">{location}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default StaticsGraph;
