import { Link } from "react-router-dom";
import LoginBar from "../components/LoginBar";
import "../styles/intro.css";

export default function Intro() {
  return (
    <div>
      <LoginBar></LoginBar>
      <div className="main-container">
        <div className="main-box">
          <h1 className="main-title">TABA? 타봐!</h1>
          <button className="main-button">
            <Link to="/main" className="main-button-title">
              Get started
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
