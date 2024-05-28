import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginmodal.css";
import cancel from "../icons/login_cancel.png";
import { loginUser } from "../services/apiService";
import UserContext from "../context/UserContext";

const LoginModal = () => {
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onChangeID = (event) => {
    setID(event.target.value);
  };

  const onChangePW = (event) => {
    setPW(event.target.value);
  };

  const clearInput = (type) => {
    if (type === "id") {
      setID("");
    } else if (type === "pw") {
      setPW("");
    }
  };

  const handleLogin = () => {
    loginUser(id, pw)
      .then((response) => {
        console.log("Login Response:", response); // 응답 데이터 확인
        if (response.success) {
          const userData = response.data; // 응답에서 사용자 데이터 추출
          console.log("User Data:", userData); // 사용자 데이터 확인
          setUser({ name: userData.name }); // 사용자 정보 설정
          localStorage.setItem("jwt", userData.jwt); // JWT를 LocalStorage에 저장
          navigate("/main");
        } else {
          alert("Login failed. Please check your ID and Password.");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };

  return (
    <div className="id-container">
      <div className="id-box">
        <div className="id-input-container">
          <input
            className="id-input_text"
            type="text"
            placeholder="ID"
            value={id}
            onChange={onChangeID}
          />
          {id && (
            <button
              onClick={() => clearInput("id")}
              className="id-clear-button"
            >
              <img src={cancel} className="id-login-cancel" alt="Clear ID" />
            </button>
          )}
        </div>
        <div className="id-input-container">
          <input
            className="id-input_text"
            type="password"
            placeholder="PW"
            value={pw}
            onChange={onChangePW}
          />
          {pw && (
            <button
              onClick={() => clearInput("pw")}
              className="id-clear-button"
            >
              <img
                src={cancel}
                className="id-login-cancel"
                alt="Clear password"
              />
            </button>
          )}
        </div>
        <div className="id-button-container">
          <button onClick={handleLogin} className="id-login-button">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
