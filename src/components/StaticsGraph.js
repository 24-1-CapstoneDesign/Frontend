import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/staticsgraph.css";
import { fetchCarData } from "../services/carService";

function StaticsGraph({ sessionData }) {
  const [data, setData] = useState({
    small: 0,
    medium: 0,
    large: 0,
    success: 0,
    failure: 0,
    locations: [],
  });

  useEffect(() => {
    const fetchCarSizes = async () => {
      if (sessionData && Array.isArray(sessionData.data)) {
        console.log("sessionData:", sessionData.data);
        const carSizeCounts = { small: 0, medium: 0, large: 0 };
        const successFailureCounts = { success: 0, failure: 0 };
        const locations = new Set();

        const carDataPromises = sessionData.data.map(async (session) => {
          if (session.car_id) {
            const carData = await fetchCarData(session.car_id);
            console.log(`Car data for car_id ${session.car_id}:`, carData);
            return {
              ...session,
              car_size: carData.data.car_size.toLowerCase(),
            };
          }
          return session;
        });

        const sessionsWithCarData = await Promise.all(carDataPromises);
        console.log("Sessions with car data:", sessionsWithCarData);

        sessionsWithCarData.forEach((session) => {
          if (session.car_size) {
            console.log(
              `Car size for session ${session.car_id}:`,
              session.car_size
            );
            if (session.car_size === "small") carSizeCounts.small++;
            if (session.car_size === "medium") carSizeCounts.medium++;
            if (session.car_size === "large") carSizeCounts.large++;
          }

          if (session.error_status) {
            if (
              session.error_status === "SUCCESS" ||
              session.error_status === "SOLVE"
            )
              successFailureCounts.success++;
            if (session.error_status === "ERROR")
              successFailureCounts.failure++;
          }

          if (session.error_latitude && session.error_longitude) {
            locations.add(
              `${session.error_latitude}, ${session.error_longitude}`
            );
          }
        });

        console.log("Car size counts:", carSizeCounts);
        console.log("Success/Failure counts:", successFailureCounts);

        setData({
          small: carSizeCounts.small,
          medium: carSizeCounts.medium,
          large: carSizeCounts.large,
          success: successFailureCounts.success,
          failure: successFailureCounts.failure,
          locations: Array.from(locations).slice(0, 6), // 최대 6개까지만 출력
        });
      } else {
        console.log("sessionData is not an array:", sessionData);
      }
    };

    fetchCarSizes();
  }, [sessionData]);

  const pieData = {
    labels: ["소형차", "중형차", "대형차"],
    datasets: [
      {
        data: [data.small, data.medium, data.large],
        backgroundColor: ["#3b82f6", "#f59e0b", "#ef4444"],
        hoverBackgroundColor: ["#2563eb", "#d97706", "#dc2626"],
      },
    ],
  };

  const barData = {
    labels: ["성공", "실패"],
    datasets: [
      {
        label: "개수",
        data: [data.success, data.failure],
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
        max: 15,
      },
      y: {
        ticks: {
          callback: function (value) {
            return value === 0 ? "성공" : "실패";
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

  return (
    <div className="stat-container">
      <div className="stat-box">
        <h2>차급</h2>
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
        <h2>해결여부</h2>
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
          {data.locations.map((location, index) => (
            <li key={index} className="stat-ordered-list-item">
              <div className="location-number">{index + 1}</div>
              <div className="location-text">{location}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default StaticsGraph;
