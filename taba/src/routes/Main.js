import LeftNav from "../components/LeftNav";
import { Link } from "react-router-dom";
import NavAfterBar from "../nav_after_bar";


export default function Main() {
  return (
    <div>
      <NavAfterBar />
      <h1>Main화면</h1>
      <p>타바 메인화면</p>
      <LeftNav />
    </div>
  );
}
