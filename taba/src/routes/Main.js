import LeftNav from "../components/LeftNav";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoginBar from "../components/LoginBar";

export default function Main() {
  return (
    <div>
      {/* 테스트용 */}
      <LoginBar />
      <h1>Main화면</h1>
      <NavBar />

      <p>타바 메인화면</p>
      <LeftNav />
    </div>
  );
}
