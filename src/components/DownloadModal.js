import React, { useState, useEffect } from "react";
import "../styles/downloadmodal.css";
import {
  fetchSensorDataBySessionId,
  downloadCSV,
} from "../services/downloadCsv";

const DownloadModal = ({ isVisible, onClose, sessions }) => {
  const [selectedExits, setSelectedExits] = useState({});

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedExits((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDownload = async () => {
    try {
      // 선택된 세션의 ID를 가져옴
      const selectedSessions = sessions.filter(
        (_, index) => selectedExits[`session${index}`]
      );

      if (selectedSessions.length === 0) {
        alert("다운로드할 세션을 선택하세요.");
        return;
      }

      // 선택된 각 세션에 대해 센서 데이터를 가져옴
      for (const session of selectedSessions) {
        const sensorData = await fetchSensorDataBySessionId(
          session.driving_session_id
        );

        if (!Array.isArray(sensorData) || sensorData.length === 0) {
          throw new Error("No sensor data available.");
        }

        // CSV 파일 생성 및 다운로드
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

  useEffect(() => {
    console.log("Sessions in Modal: ", sessions); // 세션 데이터 로그 출력
    sessions.forEach((session) => {
      console.log("Session in Modal Details: ", session); // 각 세션의 상세 정보 출력
    });
  }, [sessions]);

  if (!isVisible) return null;

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
              {`위도: ${session.error_latitude || "위치 정보 없음"}, 경도: ${
                session.error_longitude || "위치 정보 없음"
              }`}
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
