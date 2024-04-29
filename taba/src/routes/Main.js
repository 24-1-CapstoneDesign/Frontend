import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <h1>Main화면</h1>

      <p>타바 메인화면</p>

      <h2>
        <Link to="/main">메인 화면</Link>
      </h2>
      <h2>
        <Link to="/statics">통계창</Link>
      </h2>
      <h2>
        <Link to="/option">사용자 관리 창</Link>
      </h2>
    </div>
  );
}
