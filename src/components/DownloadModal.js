import React, { useState, useEffect } from "react";
import "../styles/downloadmodal.css";
import {
  fetchSensorDataBySessionId,
  downloadCSV,
} from "../services/downloadCsv";

const DownloadModal = ({ isVisible, onClose, sessions }) => {
  const [selectedExits, setSelectedExits] = useState({});
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addressPromises = sessions.map((session) => {
        if (session.error_latitude !== null) {
          return reversecoord(session.error_latitude, session.error_longitude);
        } else {
          return "위치 정보 없음";
        }
      });
      const resolvedAddresses = await Promise.all(addressPromises);
      setAddresses(resolvedAddresses);
    };

    if (sessions.length > 0) {
      fetchAddresses();
    }
  }, [sessions]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedExits((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDownload = async () => {
    try {
      const selectedSessions = sessions.filter(
        (_, index) => selectedExits[`session${index}`]
      );

      if (selectedSessions.length === 0) {
        alert("다운로드할 세션을 선택하세요.");
        return;
      }

      for (const session of selectedSessions) {
        const sensorData = await fetchSensorDataBySessionId(
          session.driving_session_id
        );

        if (!Array.isArray(sensorData) || sensorData.length === 0) {
          throw new Error("No sensor data available.");
        }

        downloadCSV(
          sensorData,
          `sensor_data_session_${session.driving_session_id}.csv`
        );
      }
    } catch (error) {
      console.error("Download error: ", error);
      alert("다운로드 중 오류가 발생했습니다.");
    }
  };

  if (!isVisible) return null;

  const { naver } = window;

  function removeFirstPart(address) {
    const parts = address.split(" ", 2);
    if (parts.length > 1) {
      return address.substring(address.indexOf(parts[1]));
    }
    return address;
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

          var result = response.v2;
          var address = result.address;
          var formattedAddress = removeFirstPart(address.jibunAddress);

          resolve(formattedAddress);
        }
      );
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>사건리스트</h2>
        {sessions.length > 0 ? (
          sessions.map((session, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name={`session${index}`}
                checked={selectedExits[`session${index}`] || false}
                onChange={handleCheckboxChange}
              />
              {addresses[index] || "주소 로딩 중..."}
            </label>
          ))
        ) : (
          <p>다운 받을 데이터가 없습니다.</p>
        )}
        <button className="download-button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
