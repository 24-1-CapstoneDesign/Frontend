import React, { useState } from "react";
import "../styles/downloadmodal.css"; // Modal 전용 스타일

const DownloadModal = ({ isVisible, onClose }) => {
  const [selectedExits, setSelectedExits] = useState({
    exit1: true,
    exit2: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedExits((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDownload = () => {
    // 다운로드 처리 로직을 여기에 작성합니다.
    console.log("Selected Exits: ", selectedExits);
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>사건리스트</h2>
        <label>
          <input
            type="checkbox"
            name="exit1"
            checked={selectedExits.exit1}
            onChange={handleCheckboxChange}
          />
          화곡역 5번 출구
        </label>
        <label>
          <input
            type="checkbox"
            name="exit2"
            checked={selectedExits.exit2}
            onChange={handleCheckboxChange}
          />
          충무로역 1번 출구
        </label>
        <button className="download-button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
