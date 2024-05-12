import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css"; // CSS 파일 import

import logo from "../icons/logo.png";
import logout from "../icons/logout.png";
import menu from "../icons/menu.png";
import cancel from "../icons/cancel.png";
import logout_menu from "../icons/logout_menu.png";
import change from "../icons/change.png";
import home from "../icons/home.png";
import mypage from "../icons/mypage.png";
import data from "../icons/data.png";

import PasswordModal from "./PasswordModal";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // 메뉴의 초기값을 false로 설정

  const toggleMenu = () => {
    setIsOpen(!isOpen); // on,off 개념 boolean
  };

  const [PWOpen, setPWOpen] = useState(false);

  const openModalHandler = () => {
    setPWOpen(!PWOpen);
  };

  return (
    <>
      <header class="header">
        <div class="logo">
          <img src={logo} alt="로고" />
        </div>

        <div class="right">
          <p class="password-wrapper">
            <button
              className="header-password-text"
              onClick={() => openModalHandler(true)}
            >
              Password
            </button>
          </p>

          <p class="greeting-normal">Hello</p>
          <p class="greeting-bold"> bomin</p>
          <p>
            <Link to="/" class="logout">
              <img src={logout} />
            </Link>
          </p>
        </div>

        <div className="mobile">
          <img src={isOpen ? cancel : menu} onClick={toggleMenu} />
        </div>
      </header>

      <div className="PWModalContainer">
        {PWOpen && (
          <div>
            <div className="PWModalBackdrop" onClick={openModalHandler}>
              <div onClick={(e) => e.stopPropagation()}>
                <PasswordModal></PasswordModal>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="mobile-container">
          <div className="mobile-box">
            <p className="mobile-greeting-text">Hello</p>
            <p className="mobile-user-text"> bomin</p>
          </div>
          <div className="mobile-menu">
            <div className="mobile-choice">
              <Link
                to="/main"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img src={home} className="mobile-icon" />
                <p className="mobile-menu-text">HOME</p>
              </Link>
            </div>

            <div className="mobile-choice">
              <Link
                to="/statics"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img src={data} className="mobile-icon" />
                <p className="mobile-menu-text">STATISTIC</p>
              </Link>
            </div>

            <div className="mobile-choice">
              <Link
                to="/option"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img src={mypage} className="mobile-icon" />
                <p className="mobile-menu-text">USER MANAGEMENT</p>
              </Link>
            </div>

            <div className="mobile-choice">
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img src={change} className="mobile-icon" />
                <p className="mobile-menu-text">CHANGE PASSWORD</p>
              </Link>
            </div>

            <div className="mobile-choice">
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img src={logout_menu} className="mobile-icon" />
                <p className="mobile-menu-text">LOGOUT</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
