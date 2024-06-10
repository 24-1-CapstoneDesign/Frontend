import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/passwordmodal.css";

import eye_close from "../icons/eye_close.png";
import eye_open from "../icons/eye_open.png";

import { ChangePW } from "../services/ChangePW";
import UserContext from "../context/UserContext";

const PasswordModal = () => {
  const { user } = useContext(UserContext); // 현재 사용자 정보 가져오기
  const navigate = useNavigate();

  const [ori_pw, setoriPW] = useState("");
  const [new_pw, setnewPW] = useState("");
  const [check_pw, setcheckPW] = useState("");

  const [hideOriPW, setHideOriPW] = useState(true);
  const [hideNewPW, setHideNewPW] = useState(true);
  const [hideCheckPW, setHideCheckPW] = useState(true);

  const onChangeOriPW = (event) => {
    setoriPW(event.target.value);
  };

  const onChangeNewPW = (event) => {
    setnewPW(event.target.value);
  };
  const onChangeCheckPW = (event) => {
    setcheckPW(event.target.value);
  };

  const handlePW = () => {
    ChangePW(user.name, ori_pw, new_pw, check_pw)
      .then((response) => {
        console.log("PW Response:", response); // 응답 데이터 확인
        if (response.success) {
          alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("PW Error:", error);
      });
  };

  return (
    <div className="pw-container">
      <div className="pw-box">
        <div className="password-bold">비밀번호 변경</div>
        <div className="pw-input-container">
          <input
            className="pw-input_text"
            type={hideOriPW ? "text" : "password"}
            placeholder="기존 비밀번호"
            value={ori_pw}
            onChange={onChangeOriPW}
          />
          {ori_pw && (
            <button
              onClick={() => setHideOriPW(!hideOriPW)}
              className="pw-clear-button"
            >
              <img
                src={hideOriPW ? eye_open : eye_close}
                className="pw-cancel"
              />
            </button>
          )}
        </div>
        <div className="pw-input-container">
          <input
            className="pw-input_text"
            type={hideNewPW ? "text" : "password"}
            placeholder="변경할 비밀번호"
            value={new_pw}
            onChange={onChangeNewPW}
          />
          {new_pw && (
            <button
              onClick={() => setHideNewPW(!hideNewPW)}
              className="pw-clear-button"
            >
              <img
                src={hideNewPW ? eye_open : eye_close}
                className="pw-cancel"
              />
            </button>
          )}
        </div>
        <div className="pw-input-container">
          <input
            className="pw-input_text"
            type={hideCheckPW ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={check_pw}
            onChange={onChangeCheckPW}
          />
          {check_pw && (
            <button
              onClick={() => setHideCheckPW(!hideCheckPW)}
              className="pw-clear-button"
            >
              <img
                src={hideCheckPW ? eye_open : eye_close}
                className="pw-cancel"
              />
            </button>
          )}
        </div>
        <div className="pw-confirm-container">
          <button className="pw-confirm-button" onClick={handlePW}>
            확 인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
