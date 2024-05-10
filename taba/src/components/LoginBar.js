import React, { useState } from "react";

import LoginModal from "./LoginModal";

import "../styles/loginbar.css"; // CSS 파일 import

import human from "../icons/before_login.png";

const LoginBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="header">
        <p className="header-title">Welcome to TABA</p>
        <div className="header-login">
          <div className="header-divider"></div>
          <img src={human} className="header-login-icon" />
          <button
            className="header-login-text"
            onClick={() => openModalHandler(true)}
          >
            로그인
          </button>
        </div>

        <div className="ModalContainer">
          {isOpen && (
            <div>
              <div className="ModalBackdrop" onClick={openModalHandler}>
                <div onClick={(e) => e.stopPropagation()}>
                  <LoginModal></LoginModal>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginBar;
