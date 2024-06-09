import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
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
import UserContext from "../context/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  // console.log(user); // 추가된 부분
  const [isOpen, setIsOpen] = useState(false);
  const [PWOpen, setPWOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModalHandler = () => {
    setPWOpen(!PWOpen);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("jwt"); // LocalStorage에서 JWT 삭제
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="로고" />
        </div>

        <div className="right">
          <p className="password-wrapper">
            <button
              className="header-password-text"
              onClick={() => openModalHandler(true)}
            >
              Password
            </button>
          </p>

          <p className="greeting-normal">Hello</p>
          <p className="greeting-bold"> {user ? user.name : "Guest"}</p>
          <p>
            <button onClick={handleLogout} className="logout">
              <img src={logout} alt="Logout" />
            </button>
          </p>
        </div>

        <div className="mobile">
          <img
            src={isOpen ? cancel : menu}
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
            alt="mobile"
          />
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
            <p className="mobile-user-text"> {user ? user.name : "Guest"}</p>
          </div>
          <div className="mobile-menu">
            <Link
              to="/main"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              className="mobile-choice"
            >
              <img src={home} className="mobile-icon" alt="Home" />
              <p className="mobile-menu-text">HOME</p>
            </Link>

            <Link
              to="/statics"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              className="mobile-choice"
            >
              <img src={data} className="mobile-icon" alt="Statistics" />
              <p className="mobile-menu-text">STATISTIC</p>
            </Link>

            <Link
              to="/option"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              className="mobile-choice"
            >
              <img src={mypage} className="mobile-icon" alt="User Management" />
              <p className="mobile-menu-text">USER MANAGEMENT</p>
            </Link>

            <div className="mobile-choice">
              <button
                onClick={() => openModalHandler(true)}
                className="mobile-password-button"
              >
                <img
                  src={change}
                  className="mobile-icon"
                  alt="Change Password"
                />
                <p className="mobile-menu-text">CHANGE PASSWORD</p>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="mobile-choice mobile-logout"
            >
              <img src={logout_menu} className="mobile-icon" alt="Logout" />
              <p className="mobile-menu-text">LOGOUT</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
