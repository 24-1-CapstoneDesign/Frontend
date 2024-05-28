import { useState } from "react";
import LoginBar from "../components/LoginBar";
import LoginModal from "../components/LoginModal"; // LoginModal import 추가
import "../styles/intro.css";

export default function Intro() {
  const [showLoginModal, setShowLoginModal] = useState(false); // LoginModal을 보여주는 상태 추가

  const handleGetStartedClick = () => {
    setShowLoginModal(true); // 버튼 클릭 시 LoginModal을 보여줌
  };

  const handleCloseModal = () => {
    setShowLoginModal(false); // 모달 외부 클릭 시 모달을 닫음
  };

  return (
    <div>
      <LoginBar></LoginBar>
      <div className="main-container">
        <div className="main-box">
          <h1 className="main-title">TABA? 타봐!</h1>
          <button className="main-button" onClick={handleGetStartedClick}>
            <span className="main-button-title">Get started</span>
          </button>
        </div>
      </div>
      {showLoginModal && (
        <div className="login-modal-container" onClick={handleCloseModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <LoginModal />
          </div>
        </div>
      )}
    </div>
  );
}
