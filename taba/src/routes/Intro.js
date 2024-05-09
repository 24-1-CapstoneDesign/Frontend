import { Link } from "react-router-dom";
import LoginBar from "../components/LoginBar";

export default function Intro() {
  return (
    <div>
      <div>
        <LoginBar></LoginBar>
      </div>

      <h1>TABA? 타봐!</h1>

      <h2>
        <Link to="/main">Get started</Link>
      </h2>
    </div>
  );
}
