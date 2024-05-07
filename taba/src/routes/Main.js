import LeftNav from "../components/LeftNav";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Main() {
  return (
    <div>
      <NavBar />
      <h1>Main화면</h1>
      <p>타바 메인화면</p>
      <LeftNav />
    </div>
  );
}
