import LeftNav from "../components/LeftNav";
import NavBar from "../components/NavBar";
import Calendar from "../components/Calendar";

export default function Statics() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <LeftNav />
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
}
