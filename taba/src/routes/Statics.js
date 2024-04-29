import { Link } from "react-router-dom";

export default function Statics() {
  return (
    <div>
      <h1>통계 화면</h1>

      <p>타바 통계화면</p>

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
