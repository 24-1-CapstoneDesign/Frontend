import React, { useState } from "react";

import "../styles/passwordmodal.css";

import eye_close from "../icons/eye_close.png";
import eye_open from "../icons/eye_open.png";

const PasswordModal = () => {
  const [ori_pw, setoriPW] = useState("");
  const [new_pw, setnewPW] = useState("");
  const [check_pw, setcheckPW] = useState("");

  const onChangeOriPW = (event) => {
    setoriPW(event.target.value);
  };

  const onChangeNewPW = (event) => {
    setnewPW(event.target.value);
  };
  const onChangeCheckPW = (event) => {
    setcheckPW(event.target.value);
  };

  const clearInput = (type) => {
    if (type === "ori_pw") {
      setoriPW("");
    } else if (type === "new_pw") {
      setnewPW("");
    } else if (type === "check_pw") {
      setcheckPW("");
    }
  };

  return (
    <div className="container">
      <div className="pwbox">
        <div className="password-bold">비밀 번호 변경</div>
        <div className="input-container">
          <input
            className="input_text"
            type="text"
            placeholder="기존 비밀번호"
            value={ori_pw}
            onChange={onChangeOriPW}
          />
          {ori_pw && (
            <button
              onClick={() => clearInput("ori_pw")}
              className="clear-button"
            >
              <img src={eye_open} className="login-cancel" />
            </button>
          )}
        </div>
        <div className="input-container">
          <input
            className="input_text"
            type="password"
            placeholder="변경할 비밀번호"
            value={new_pw}
            onChange={onChangeNewPW}
          />
          {new_pw && (
            <button
              onClick={() => clearInput("new_pw")}
              className="clear-button"
            >
              <img src={eye_open} className="login-cancel" />
            </button>
          )}
        </div>
        <div className="input-container">
          <input
            className="input_text"
            type="password"
            placeholder="비밀번호 확인"
            value={check_pw}
            onChange={onChangeCheckPW}
          />
          {check_pw && (
            <button
              onClick={() => clearInput("check_pw")}
              className="clear-button"
            >
              <img src={eye_open} className="login-cancel" />
            </button>
          )}
        </div>
        <div className="button-container">
          <button className="login-button">확인</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
