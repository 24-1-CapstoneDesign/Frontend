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

  const { naver } = window;

  function removeFirstPart(address) {
    const parts = address.split(" ", 2); // 주소를 처음 두 번째 공백까지 나누기
    if (parts.length > 1) {
      return address.substring(address.indexOf(parts[1])); // 두 번째 부분부터 반환
    }
    return address; // 공백이 없으면 원래 주소 반환
  }

  function reversecoord(latitude, longitude) {
    return new Promise((resolve, reject) => {
      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(latitude, longitude),
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            console.error("Reverse geocoding failed with status:", status);
            reject(status);
            return;
          }

          var result = response.v2; // 검색 결과의 컨테이너
          var address = result.address; // 검색 결과로 만든 주소
          var formattedAddress = removeFirstPart(address.jibunAddress); // 주소의 앞부분 제거

          resolve(formattedAddress);
        }
      );
    });
  }

  useEffect(() => {
    const fetchCarSizes = async () => {
      if (sessionData && Array.isArray(sessionData.data)) {
        const carSizeCounts = { small: 0, medium: 0, large: 0 };
        const successFailureCounts = { success: 0, failure: 0 };
        const locations = new Set();

        const carDataPromises = sessionData.data.map(async (session) => {
          if (session.car_id) {
            const carData = await fetchCarData(session.car_id);
            return {
              ...session,
              car_size: carData.data.car_size.toLowerCase(),
            };
          }
          return session;
        });

        const sessionsWithCarData = await Promise.all(carDataPromises);

        for (const session of sessionsWithCarData) {
          if (session.car_size) {
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
            const address = await reversecoord(
              session.error_latitude,
              session.error_longitude
            );
            locations.add(address);
          }
        }

        setData({
          small: carSizeCounts.small,
          medium: carSizeCounts.medium,
          large: carSizeCounts.large,
          success: successFailureCounts.success,
          failure: successFailureCounts.failure,
          locations: Array.from(locations).slice(0, 6), // 최대 6개까지만 출력
        });
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
