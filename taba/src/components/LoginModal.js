import React from "react";
import "../styles/loginmodal.css";

const LoginModal = () => {
  return (
    <div className="container">
      <div className="box">
        <div className="input-container">
          <input className="label" type="text" placeholder="ID" />
        </div>
        <div className="input-container">
          <input className="label" type="text" placeholder="PW" />
        </div>
        <div className="button-container">
          <button className="login-button">LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
