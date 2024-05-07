import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css"; // CSS 파일 import

import logo from "../icons/logo.png";
import logout from "../icons/logout.png";
import menu from "../icons/menu.png";
import cancel from "../icons/cancel.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // 메뉴의 초기값을 false로 설정

  const toggleMenu = () => {
    setIsOpen(!isOpen); // on,off 개념 boolean
  };

  return (
    <header class="header">
      <div class="logo">
        <img src={logo} alt="로고" />
      </div>

      <div class="right">
        <p class="password-wrapper">
          <Link to="/" class="password-text">
            Password
          </Link>
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
  );
};

export default NavBar;
