import React, { useState } from "react";
import "../styles/loginmodal.css";
import cancel from "../icons/login_cancel.png";

const LoginModal = () => {
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

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

  return (
    <div className="container">
      <div className="box">
        <div className="input-container">
          <input
            className="input_text"
            type="text"
            placeholder="ID"
            value={id}
            onChange={onChangeID}
          />
          {id && (
            <button onClick={() => clearInput("id")} className="clear-button">
              <img src={cancel} className="login-cancel" />
            </button>
          )}
        </div>
        <div className="input-container">
          <input
            className="input_text"
            type="password"
            placeholder="PW"
            value={pw}
            onChange={onChangePW}
          />
          {pw && (
            <button onClick={() => clearInput("pw")} className="clear-button">
              <img src={cancel} className="login-cancel" />
            </button>
          )}
        </div>
        <div className="button-container">
          <button className="login-button">LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
