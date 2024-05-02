import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <div>
      <h1>타바 소개창</h1>
      <p>로그인 및 타바 소개창</p>
      <h2>
        <Link to="/main">메인 화면으로 로그인하기</Link>
      </h2>
    </div>
  );
}
