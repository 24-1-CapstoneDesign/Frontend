import React from "react";
import "../styles/NavBar.css"; // CSS 파일 import
import logo from "../icons/logo.png";
import logout from "../icons/logout.png";
import menu from "../icons/menu.png";
import { Link } from "react-router-dom";

const NavBar = () => {
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

      <div class="menu">
        <Link to="/">
          <img src={menu} alt="menu" />
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
